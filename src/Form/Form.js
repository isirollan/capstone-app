import React, { useState, useEffect, useContext } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { apiContext } from '../App';
import { useNavigate } from "react-router";



function Form() {

  const [fabric, setFabric] = useState({ composition: {}, sample_id: "" }); // remove name:"" which seems unnecessary
  const [isEditing, setIsEditing] = useState(false);
  const [editComposition, setEditComposition] = useState([]);
  const successNavigate = useNavigate();
  const [totalPercentage, setTotalPercentage] = useState(0); //default state of percentages
  const {modelResponse, setsavefabricResponse} = useContext(apiContext); // will save the answer of the second API to navigate to the next 

  useEffect(() => {
    axios.get('http://localhost:3000/fabric')
      .then(res => {
        console.log("Received data:", res.data);  // Log the fetched data
        setFabric(res.data);
        const compositionArray = Object.entries(res.data.composition).map(([material, percentage]) => ({
          materialName: material,
          percentage
      }));
        setEditComposition(compositionArray);
        //check total sum
        const initialTotal = compositionArray.reduce((sum, item) => sum + parseFloat(item.percentage), 0);
        setTotalPercentage(initialTotal);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
      });
  }, []);

  const handleCompositionChange = (index, field, value) => {
    const updatedComposition = [...editComposition];
    updatedComposition[index][field] = value;
    setEditComposition(updatedComposition);
};
  
  const saveEdits = () => {
    const newComposition = editComposition.reduce((acc, { materialName, percentage }) => {
        acc[materialName] = Number(percentage); // Ensure percentage is stored as a number
        return acc;
    }, {});
    setFabric(prevState => ({ ...prevState, composition: newComposition }));
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


  //with AWS API
  const confirmComposition = async () => {
    //const saveEndpoint = amplifyconfiguration.AWS_REST_ENDPOINT + "/dev"
    try {
        const response = await axios.post('https://okix74mu6c.execute-api.us-west-2.amazonaws.com/dev/savefabric', fabric);
        if (response.data.success) {
          setsavefabricResponse(response.data.success);
          console.log(response.data)
          successNavigate('/success');
        } else {
          throw new Error(response.data.error); //handling response error
        }

    } catch (error) {
      if (error.response && error.response.status === 400) {
        window.alert(error.response.data.error);
      } else {
        console.error('Error posting data:', error);
      }
    }
  };
  // useEffect hook to update totalPercentage whenever 'editComposition' changes
  useEffect(() => {
    const total = editComposition.reduce((sum, item) => sum + parseFloat(item.percentage), 0);
    setTotalPercentage(total);
  }, [editComposition]);
  // check function to use totalPercentage directly instead of recalculating it:
  const checkCompositionSum = () => {
    return totalPercentage === 100;
  };
  

 
  return (
    <div>
        <Header/>
        <div>
          <h3>{modelResponse}</h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div>
                <h1>Fabric Composition</h1>
                <h5>{fabric.sample_id}</h5>
                {!isEditing ? (
                    <>
                        <ul>
                            {editComposition.map(({ materialName, percentage }, index) => (
                                <li key={index}>{materialName}: {percentage}%</li>
                            ))}
                        </ul>
                        <div>Total Percentage: {totalPercentage.toFixed(2)}%</div> {/* Display the total percentage */}
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={confirmComposition} disabled={!checkCompositionSum()}>Confirm</button>
                    </>
                ) : (
                    <>
                        {editComposition.map(({ materialName, percentage }, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={materialName}
                                    onChange={(e) => handleCompositionChange(index, 'materialName', e.target.value)}
                                />
                                <input
                                    type="number"
                                    value={percentage}
                                    onChange={(e) => handleCompositionChange(index, 'percentage', e.target.value)}
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
};

export default Form;