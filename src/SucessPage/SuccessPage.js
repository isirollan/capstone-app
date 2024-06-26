import React, {useContext} from 'react';
import Header from '../Header/Header';
import { apiContext } from '../App';
import { useNavigate } from 'react-router';

const SuccesPage = () => {
    // Getting the answer from previous API called in Form
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
            <div className='success'>
                <p>Write the ID if you haven't already</p>
                <p>{savefabricResponse}</p>
            </div>
           
            <div className='button-container'>
                <button className="button" onClick={cameraClick}>Another Picture</button>
                <button className="button" onClick={homeClick}>Return to Home</button>
            </div>
        </>
    )
}

export default SuccesPage;
