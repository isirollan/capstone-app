import React, { useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router";
import '../styles/camera.css';
import Header from "../Header/Header";
import axios from 'axios';
//import {  CameraContext } from '../App';
// Changed from function Camera()
const Camera = () => {


	
	//local states
	const [hasPhoto, setHasPhoto] = useState(false); 
	const [photoBlob, setPhotoBlob] = useState(null); // State to store the photo blob
	const videoRef = useRef(null);
	const photoRef = useRef(null);
	//creating function to navigate to camera
	const formNavigate = useNavigate();    


	//Call API with photo
	const sendPhotoToAPI = (blob) => {
		// Construct form data to send the blob to the API
		const formData = new FormData();
		formData.append('photo', blob, 'photo.jpg');
	
		// Example: Sending the blob using fetch
		axios.post('https://urvi39b5u9.execute-api.us-east-1.amazonaws.com/test', formData)
		.then(response => {
			console.log('Response: ', response.data)
		})
		.catch(error => {
			console.error('Error sending photo:', error);
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
	//THIS IS THE ORIGINAL THAT WAS WORKING ON PC
	// 	navigator.mediaDevices
	// 	  .getUserMedia({ 
	// 		video: { width: 1920, height: 1080 } 
	// 	  })
	// 	  .then(stream => {
	// 		let video = videoRef.current;
	// 		video.srcObject = stream;
			
	// 		// Wait for the video's metadata to load before playing
	// 		video.onloadedmetadata = () => {
	// 		  video.play();
	// 		};
	// 	  })
	// 	  .catch(err => {
	// 		console.error(err);
	// 	  });
	//   }
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
				// Set the Photob blob in state
				setPhotoBlob(blob);
			});

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
			// Call the function to send the photo blob to the API
			sendPhotoToAPI(photoBlob);
			// Navigate to the form page
			formNavigate("/form");
		} else {
			// Notify the user to take a photo before sending
			alert("Please take a photo before sending.");
		}
	}

	// useEffect(() => {
	// getVideo();
	
	// // Cleanup function to stop the video stream
	// return () => {
	// 	if (videoRef.current && videoRef.current.srcObject) {
	// 	const tracks = videoRef.current.srcObject.getTracks();
	// 	tracks.forEach(track => track.stop());
	// 	}
	// };
	// }, [videoRef]);

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
				</div>
			</div>
		</>

	);
}

export default Camera;
