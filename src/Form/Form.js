import React, { useState, useEffect, useContext } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { apiContext } from '../App';
import { useNavigate } from "react-router";
// import amplifyconfiguration from "../amplifyconfiguration.json";

  // Enable CORS for all routes

function Form() {

  //const [fabric, setFabric] = useState({ name: "", composition: [] });
  const [fabric, setFabric] = useState({ composition: {}, sample_id: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editComposition, setEditComposition] = useState([]);
  const successNavigate = useNavigate();
  const {setsavefabricResponse} = useContext(apiContext); // will save the answer of the second API to navigate to the next 

  useEffect(() => {
    axios.get('http://localhost:3000/fabric')
      .then(res => {
        console.log("Received data:", res.data);  // Log the fetched data
        setFabric(res.data);
        setEditComposition(res.data.composition);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const handleEditChange = (index, event) => {
    const newEditComposition = [...editComposition];
    newEditComposition[index].percentage = event.target.value;
    setEditComposition(newEditComposition);
  };
  // //OLD VERSION (with local API)
  // const saveEdits = () => {
  //   // Here you would update the backend with the new composition
  //   // For simplicity, we're just updating the front-end state
  //   setFabric({ ...fabric, composition: editComposition });
  //   setIsEditing(false);
  //};
  const saveEdits = () => {
    const newComposition = editComposition.reduce((acc, { material, percentage }) => {
      acc[material] = percentage;
      return acc;
    }, {});
    setFabric({ ...fabric, composition: newComposition });
    setIsEditing(false);
  };


  //with LOCAL API
  // const confirmComposition = async() => {
  //   try { 
  //     const response = await axios.post('http://localhost:3000/confirm-fabric', fabric);
  //     setsavefabricResponse(response.data);
  //     successNavigate('/success');

  //   } catch (error) {
  //     console.error("Error posting data:", error);
  //   }
  // };


  // const confirmComposition = () => {
  //   // Placeholder for any action to confirm composition
  //   // For example, displaying a message
  //   successNavigate('/success');
  // };

  //with AWS API
  const confirmComposition = async () => {
    //const saveEndpoint = amplifyconfiguration.AWS_REST_ENDPOINT + "/dev"
    
    try {
        const response = await axios.post('https://46bbjp6tnb.execute-api.us-east-1.amazonaws.com/prod', fabric);
        setsavefabricResponse(response.data);
        console.log(response.data)
        successNavigate('/success');
    } catch (error) {
        console.error('Error posting data:', error);
    }
  };

  // useEffect(() => {
  //   confirmComposition()
  // }, []) //with this empty array, this will execute once

  return (
    <div>
      <Header/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div>
          <h1>Fabric Composition</h1>
          <h2>{fabric.sample_id}</h2>
          {!isEditing ? (
            <>
              <ul>
                {Object.entries(fabric.composition).map(([material, percentage], index) => (
                  <li key={index}>{material}: {percentage}%</li>
                ))}
              </ul>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={confirmComposition}>Confirm</button> {/* Confirm Button */}
            </>
          ) : (
            <>
              {editComposition.map((item, index) => (
                <div key={index}>
                  <p> {item.material}</p>
                  <input
                    type="number"
                    value={item.percentage}
                    onChange={(e) => handleEditChange(index, e)}
                  />
                </div>
              ))}
              <button onClick={saveEdits}>Save Changes</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Form;