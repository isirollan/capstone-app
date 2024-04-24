import React from 'react';
import '../styles/camera.css';
import Header from '../Header/Header';
function IntermediatePage() {
    return (
        <>
            <Header/>
            <div className='intermediate-page'>
                <div className='loader'></div>
                <h2>Processing your photo...</h2>
            </div>
        </>
 
    );
}
export default IntermediatePage