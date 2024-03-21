import React, {useRef, useEffect, useState} from "react";

function App() {

	const videoRef = useRef(null);
	const photoRef = useRef(null);

	const [hasPhoto, setHasPhoto] = useState(false);

	const getVideo = () => {
		navigator.mediaDevices
		  .getUserMedia({ 
			video: { width: 1920, height: 1080 } 
		  })
		  .then(stream => {
			let video = videoRef.current;
			video.srcObject = stream;
			
			// Wait for the video's metadata to load before playing
			video.onloadedmetadata = () => {
			  video.play();
			};
		  })
		  .catch(err => {
			console.error(err);
		  });
	  }
	
	const takePhoto = () => {

		let video = videoRef.current;
		let photo = photoRef.current;
		let ctx = photo.getContext('2d');

		const displayWidth = photo.offsetWidth;
		const displayHeight = displayWidth / (16/9);
		// const pixelRatio = window.devicePixelRatio || 1;

		photo.width = displayWidth;
		photo.height = displayHeight;
		// photo.width = displayWidth * pixelRatio;
		// photo.height = displayHeight * pixelRatio;

		// ctx.scale(pixelRatio, pixelRatio);
		ctx.drawImage(video, 0, 0, photo.width, photo.height);

		setHasPhoto(true);
		
	}
	
	const closePhoto = () => {
		let photo = photoRef.current;
		let ctx = photo.getContext('2d');

		ctx.clearRect(0, 0, photo.width, photo.height);

		setHasPhoto(false);
		
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
		<div className="App">
			<div className="camera">
				<video ref={videoRef}></video>
				<button onClick={takePhoto}>SNAP!</button>
			</div>
			<div className={'result ' + (hasPhoto ? 'hasPhoto'
			: '')}>
				<canvas ref={photoRef}></canvas>
				<button onClick={closePhoto}>CLOSE!</button>
			</div>
		</div>
	);
}

export default App;
