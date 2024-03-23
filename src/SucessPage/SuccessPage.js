import React, {useState, useEffect} from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router';

const SuccesPage = () => {

    //local variables
    const [answer, setAnswer] = useState([]) // This will use the answer of the API to display in our HTML

    // Axios library is asynchronous
    async function fetchAnswer () {
        // the way to call if if the endpoint is in my project
        //const answerGetEndpoint = configData.AWS_REST_ENDPOINT
        // this below connects with the endpoint
        try {
            const response = await axios.post(`https://x38r81hlgi.execute-api.us-east-1.amazonaws.com/test_confirm_composition`)
            setAnswer(response.data)
        } catch(error) {
            console.error(error)
        }
    };

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

    //execute the function while the webpage is charging, to avoid re-rendering multiple times
    // we will execute once the page lode (adding the empty array [] )
    useEffect(() => {
        fetchAnswer()
    }, [])

    return (
        <>
            <Header/>
            <h2>Success!</h2>
            <div>
                <p>Label created successfully!</p>
                <p>Write the ID if you haven't already</p>
                <p>{answer}</p>

            </div>
           
            <div>
                <button onClick={cameraClick}>Another Picture</button>
                <button onClick={homeClick}>Return to Home</button>
            </div>
        </>

    )



}


export default SuccesPage;
