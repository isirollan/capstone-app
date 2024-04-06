import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { useNavigate } from "react-router";

function Form() {
  const [fabric, setFabric] = useState({ name: "", composition: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [editComposition, setEditComposition] = useState([]);
  const successNavigate = useNavigate();

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

  const saveEdits = () => {
    // Here you would update the backend with the new composition
    // For simplicity, we're just updating the front-end state
    setFabric({ ...fabric, composition: editComposition });
    setIsEditing(false);
  };

  const confirmComposition = () => {
    axios.post('http://localhost:3000/confirm-fabric', fabric)
      .then(response => {
        console.log("Response:", response.data);
        successNavigate('/success');
      })
      .catch(error => {
        console.error("Error posting data:", error);
      });
  };
  // const confirmComposition = () => {
  //   // Placeholder for any action to confirm composition
  //   // For example, displaying a message
  //   successNavigate('/success');
  // };

  return (
    <div>
      <Header/>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <div>
          <h1>Fabric Composition</h1>
          <h2>{fabric.name}</h2>
          {!isEditing ? (
            <>
              <ul>
                {fabric.composition.map((item, index) => (
                  <li key={index}>{item.material}: {item.percentage}%</li>
                ))}
              </ul>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={confirmComposition}>Confirm</button> {/* Confirm Button */}
            </>
          ) : (
            <>
              {editComposition.map((item, index) => (
                <div key={index}>
                  <input
                    type="number"
                    value={item.percentage}
                    onChange={(e) => handleEditChange(index, e)}
                  /> {item.material}
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