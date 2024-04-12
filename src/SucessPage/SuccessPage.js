import React, {useContext} from 'react';
import Header from '../Header/Header';
import { apiContext } from '../App';
import { useNavigate } from 'react-router';
import { Button as MuiButton} from '@mui/material'

const SuccesPage = () => {
    const {savefabricResponse} = useContext(apiContext);


    //creating function to navigate to camera and home
    const navigate = useNavigate();    
    // when the user click the button, send it to camera page
    const cameraClick = (e) => {
        e.preventDefault();
        navigate("/camera")
    }
    // when the user click the button, send it to  Main page
    const homeClick = (e) => {
        e.preventDefault();
        navigate("/")
    }


    return (
        <>
            <Header/>
            <h2>Success!</h2>
            <div>
                <p>Label created successfully!</p>
                <p>Write the ID if you haven't already</p>
            </div>
           
            <div>
                <button onClick={cameraClick}>Another Picture</button>
                <br></br>
                <button component={MuiButton} onClick={homeClick}>Return to Home</button>
            </div>
        </>

    )



}


export default SuccesPage;
