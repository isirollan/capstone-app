import React, { useState, useEffect, useRef, useContext} from "react";
import { useNavigate } from "react-router";
import '../styles/camera.css';
import Header from "../Header/Header";
import axios from 'axios';
import {  apiContext } from '../App';
import { uploadData } from "@aws-amplify/storage";

// Changed from function Camera()
const Camera = () => {
	//global state
	const {setmodelResponse} = useContext(apiContext);
	//local states
	const [hasPhoto, setHasPhoto] = useState(false); 
	const [photoBlob, setPhotoBlob] = useState(null); // State to store the photo blob
	const videoRef = useRef(null);
	const photoRef = useRef(null);
	const [isLoading, setIsLoading] = useState(false); // loader when the API is thinking
	//creating function to navigate to camera
	const navigate = useNavigate();
	
	
	// Function to upload photo to S3
	const uploadPhotoToS3 = async (photoBlob) => {
		setIsLoading(true) //Start loading
		navigate('/loading') //navigate to the loading page
		const uniqueName = `photo_${Date.now()}.jpg`; //Generate a unique name using the timestamp
		try {
			const result = await uploadData({
				key: uniqueName,
				data: photoBlob,
				// options: {
				// 	accessLevel: 'protected' >> I left if public for easy access
				// }
			}).result;
			console.log('Upload Success: ', result);
			console.log(result.key);
			return result.key; 
			// Return the key of the uploaded file
		} catch(error) {
			console.error('Error uploading file: ', error)
		}
	};

	// //Call API with the image key, retry once in case of time out
	const sendPhotoToAPI = (imageKey, retryCount = 0) => {
		// Sending photo calling the Sagemaker API
		axios.post(`https://8o0bt3npya.execute-api.us-east-1.amazonaws.com/dev/image-process?lambda-image-storage=lambda-image-storage&image_key=8038.jpg`) //replace this to ${imageKey}
		.then(response => {
			setmodelResponse(response.data)
			setIsLoading(false); //stop loading
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
				alert('Failed to process the photo after retrying. Please try again later.') //notify user
			}
		});
	}


	
	//Open the camera
	const getVideo = () => {
		const constraints = {
			video: {
				facingMode: { ideal: 'environment'} //prefer back camera
			}
		};

		navigator.mediaDevices.getUserMedia(constraints).then (
			stream => {
				let video = videoRef.current;
				video.srcObject = stream;
				video.onloadedmetadata = () => {
					video.play();
				};	
			})
			.catch (err => {
			console.error(err);
		});
	}

	// Take photo
	const takePhoto = () => {
			let video = videoRef.current;
			let photo = photoRef.current;
			let ctx = photo.getContext('2d');

	
			//const displayWidth = photo.offsetWidth;
			const displayWidth =   video.videoWidth*2 //this increases the quality
			//const displayHeight = displayWidth / (16/9);
			const displayHeight = video.videoHeight*2 // //this increases the quality
			// const pixelRatio = window.devicePixelRatio || 1;
	
			photo.width = displayWidth;
			photo.height = displayHeight;
			// photo.width = displayWidth * pixelRatio;
			// photo.height = displayHeight * pixelRatio;
	
			// ctx.scale(pixelRatio, pixelRatio);
			ctx.drawImage(video, 0, 0, photo.width, photo.height);
			setHasPhoto(true);

			//Convert the canvas content to a blob
			photo.toBlob((blob) => {
				// Set the Photo blob in state
				setPhotoBlob(blob);
			}, 'image/jpg');

		}



	
	const retakePhoto = () => {
		let photo = photoRef.current;
		let ctx = photo.getContext('2d');

		ctx.clearRect(0, 0, photo.width, photo.height);

		setHasPhoto(false);	
	}

		// when the user click the button, send it to camera page and send the blob
	const formClick = () => {
		// Check if a photo has been taken before sending
		if (hasPhoto && photoBlob) {
			const imageKey = uploadPhotoToS3(photoBlob);
			// Call the function to send the photo blob to the API
			if (imageKey) {
				sendPhotoToAPI(imageKey);
				// Navigate to the form page
				//formNavigate("/form");
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
			<h2>Rotate your phone to take a picture</h2>
			<div className="App">
				<div className="camera">
					<video ref={videoRef} autoPlay playsInline></video>
					<button className="snap" onClick={takePhoto}>Snap!</button>
				</div>
				<div className={'result ' + (hasPhoto ? 'hasPhoto' : '')}>
					<canvas ref={photoRef}></canvas>
						<button className="snap" onClick={formClick}>Send</button>
						<button className= "snap" onClick={retakePhoto}>Retake</button>
						{/* Loader here: This will show when the API is being called */}
						{/*{isLoading && <div className="loader"></div>}*/}
				</div>
			</div>
		</>

	);
}

export default Camera;
