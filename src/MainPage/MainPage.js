import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import '../styles/mainpage.css';
function MainPage() {


    //creating function to navigate to camera
    const navigate = useNavigate();    
    // when the user click the button, send it to camera page
    const CameraClick = (e) => {
        e.preventDefault();
        navigate("/camera")
    }
   return (
        <>
            <Header/>
            <div>
                <h1>Welcome to Refiberd Tag reader</h1>
                <button onClick={CameraClick}>Take a picture</button>
            </div>
        </>
    )
}

export default MainPage;
