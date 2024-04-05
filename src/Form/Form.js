import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router";

function Form() {
  const [fabric, setFabric] = useState({ name: "", composition: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [editComposition, setEditComposition] = useState([]);
  const successNavigate = useNavigate();

  useEffect(() => {
    // Initial fetch of fabric data
    axios.get('http://localhost:3000/fabric')
      .then(res => {
        setFabric(res.data);
        setEditComposition(res.data.composition); // Initialize edit composition state
      })
      .catch(err => {
        console.log(err);
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
    // Placeholder for any action to confirm composition
    // For example, displaying a message
    successNavigate('/success');
  };

  return (
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
  );
}

export default Form;
