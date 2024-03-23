import React from 'react';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

function Form () {

    //creating function to navigate to camera
    const successNavigate = useNavigate();    
    // when the user click the button, send it to success page (missing: + calling API)
    const successClick = (e) => {
        e.preventDefault();
        successNavigate("/success")
    }
            

    return (
        <>
        <Header/>
        <div>
            <h2>Form</h2>
        </div>
        <div>
            <ul>
                Cotton
            </ul>
            <ul>
                Polyester
            </ul>
        </div>
        <button onClick={successClick}>Send!</button>
        </>
    )
}

export default Form;