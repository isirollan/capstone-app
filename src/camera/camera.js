import React, { useState, useEffect, useRef, useContext} from "react";
import { useNavigate } from "react-router";
import '../styles/camera.css';
import Header from "../Header/Header";
import axios from 'axios';
import {  apiContext } from '../App';
import { uploadData } from "@aws-amplify/storage";
//import S3 bucket name
import awsmobile from "../aws-exports";

// Changed from function Camera()
const Camera = () => {
	//global states
	const {setmodelResponse, setimageKey} = useContext(apiContext);
	//local states
	const [hasPhoto, setHasPhoto] = useState(false); 
	const [photoBlob, setPhotoBlob] = useState(null); // State to store the photo blob
	const videoRef = useRef(null);
	const photoRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false); // loader when the API is thinking
	// navigate to other components
	const navigate = useNavigate();
	
	
	// Function to upload photo to S3
	const uploadPhotoToS3 = async (photoBlob) => {
		setIsLoading(true) //Start loading
		navigate('/loading') //navigate to the loading page
		const uniqueName = `photo_${Date.now()}.jpg`; //Generate a unique name using the timestamp
		// save image as a jpg and with the uniqueName as name
		try {
			const result = await uploadData({
				key: uniqueName,
				data: photoBlob,
			}).result;
			console.log('Upload Success: ', result);
			// saving imageKey for other components
			setimageKey(result.key);
			// Return the key of the uploaded file
			return result.key; 
			
		} catch(error) {
			console.error('Error uploading file: ', error)
		}
	};

	//Call API with the image key and S3 bucket
	const sendPhotoToAPI = (imageKey, retryCount = 0) => {
		//getting the S3  bucket name
		const bucketName = awsmobile.aws_user_files_s3_bucket
		// API endpoint
		const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;
		// Sending photo calling the Sagemaker API
		axios.post(`${apiEndpoint}/image-process?lambda-image-storage=${bucketName}&image_key=public/${imageKey}`) 
		.then(response => {
			// set the response to the next component
			setmodelResponse(response.data)
			//stop loading
			setIsLoading(false); 
			//navigate to next page
			navigate("/form")
			console.log('Response: ', response.data)
		})
		.catch(error => {
			console.error('Error saving photo:', error);
			// retry twice in case of timeout
			if ((error.response?.status === 502) && retryCount < 2) {
				console.log('Retrying...');
				sendPhotoToAPI(imageKey, retryCount + 1); // Retry the function
			} else {
				setIsLoading(false); //stop loading
				//go back to camera
				navigate("/camera")
				alert('Failed to process the photo after retrying. Please try again.') //notify user
			}
		});
	}


	
	//Open the camera
	const getVideo = () => {
		const constraints = {
			video: {
				width : {ideal:1920}, //ideal width
				height: {ideal: 1080}, //ideal height
				focusMode: {ideal: 'continuous'}, // keep adjusting focus automatically
				facingMode: { ideal: 'environment'} //prefer back camera  
			}
		};

		navigator.mediaDevices.getUserMedia(constraints).then (
			stream => {
				let video = videoRef.current;
				if (video) {
					video.srcObject = stream;
					video.onloadedmetadata = () => {
						video.play();
					};
				}
			})
			.catch (err => {
			console.error("Error accessing the camera", err);
		});
	}
	// Ensure that during the process preserves quality
	const sharpen = (ctx, width, height, mix = 0.5) => {
		const imageData = ctx.getImageData(0, 0, width, height);
		const data = imageData.data;
		for (let i = 1; i < height - 1; i++) {
			for (let j = 1; j < width - 1; j++) {
				const idx = (i * width + j) * 4;
				for (let channel = 0; channel < 3; channel++) {
					let laplacian =
						data[idx + channel - 4 * width] + // pixel above
						data[idx + channel + 4 * width] + // pixel below
						data[idx + channel - 4] + // pixel left
						data[idx + channel + 4] - // pixel right
						4 * data[idx + channel];
					data[idx + channel] -= laplacian * mix;
				}
			}
		}
		ctx.putImageData(imageData, 0, 0);
	};

	// Take photo
	const takePhoto = () => {
			let video = videoRef.current;
			let photo = photoRef.current;
			let ctx = photo.getContext('2d');

	
			//const displayWidth = photo.offsetWidth;
			const displayWidth =   video.videoWidth //this increases the quality
			//const displayHeight = displayWidth / (16/9);
			const displayHeight = video.videoHeight // //this increases the quality
			// const pixelRatio = window.devicePixelRatio || 1;
	
			photo.width = displayWidth;
			photo.height = displayHeight;
	
			ctx.drawImage(video, 0, 0, photo.width, photo.height);
			sharpen(ctx, photo.width, photo.height);
			setHasPhoto(true);

			//Convert the canvas content to a blob
			photo.toBlob((blob) => {
				// Set the Photo blob in state
				setPhotoBlob(blob);
			}, 'image/jpg');

		}



	//  When user clicks "retake"
	const retakePhoto = () => {

		//Clear the canvas
		if (photoRef.current) {
			const ctx = photoRef.current.getContext('2d');
			ctx.clearRect(0,0, photoRef.current.width, photoRef.currentheight);
			photoRef.current.width = 0; //Reset canvas size to clear it fully
			photoRef.current.height = 0;
		}

		//Reset state
		setHasPhoto(false);	
		setPhotoBlob(null);
		// Restart the video stream
		getVideo()
	};

		// when the user click "send", save image blob in S3 and call API with the image key
	const formClick = async () => {
		// Check if a photo has been taken before sending
		if (hasPhoto && photoBlob) {
			const imageKey = await uploadPhotoToS3(photoBlob);
			// Call the function to send the photo blob to the API
			if (imageKey) {
				sendPhotoToAPI(imageKey);
			}

			
		} else {
			// Notify the user to take a photo before sending
			alert("Please take a photo before sending.");
		}
	}



	useEffect(() => {
		getVideo();
		// Capture the current value of videoRef in the effect
		const currentVideo = videoRef.current;
		// Cleanup function to stop the video stream
		return () => {
		if (currentVideo && currentVideo.srcObject) {
			const tracks = currentVideo.srcObject.getTracks();
			tracks.forEach(track => track.stop());
		  	}
		};
	}, []); 

	return (
		<>
			<Header/>
			<div className="App">
				<div className="camera">
					{ !hasPhoto && (
						<>
							<h2>Rotate your phone to take a picture</h2>
							<video ref={videoRef} autoPlay playsInline></video>
							<button className="snap" onClick={takePhoto}>Snap!</button>
						</>
					)}
				</div>
				<div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
					<canvas ref={photoRef}></canvas>
					{hasPhoto && (
						<div className="button-container">
							<button className="snap" onClick={formClick}>Send</button>
							<button className= "snap" onClick={retakePhoto}>Retake</button>
						</div>
					)}
				</div>
			</div>
		</>

	);
}

export default Camera;
