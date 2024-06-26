import React, { useState, useEffect, useContext } from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { apiContext } from '../App';
import { useNavigate } from "react-router";
//import DynamoDB API
import awsmobile from '../aws-exports';



function Form() {

  //Initial state for the Model answer structure
  const [fabric, setFabric] = useState({ composition: {}, sample_id: "" }); 
  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  // save edits
  const [editComposition, setEditComposition] = useState([]);
  //navigate to the next page
  const successNavigate = useNavigate();
   //default state of percentages
  const [totalPercentage, setTotalPercentage] = useState(0);
  // Global context from "camera" components and a context to be sent to the next page
  const {modelResponse, imageKey, setsavefabricResponse} = useContext(apiContext); 

  
  // Get the answer of the model and render it 
  useEffect(() => {
    if (!modelResponse) return; // Ensure modelResponse is not null or undefined
  
    // Parse the JSON string in the `result` key of modelResponse
    const parsedResponse = JSON.parse(modelResponse.result);
  
    // Transform composition values: convert "None" to 0 and convert all numbers to integers
    const transformedComposition = {};
    Object.entries(parsedResponse.composition).forEach(([key, value]) => {
      transformedComposition[key] = value === "None" ? 0 : parseInt(value, 10);
    });
  
    // Update the fabric state with the transformed data
    const updatedFabric = {
      sample_id: parsedResponse.sample_id.split('.')[0], // Truncate anything after the decimal
      composition: transformedComposition
    };
  
    setFabric(updatedFabric);
  
    // Prepare the composition array for editing
    const compositionArray = Object.entries(updatedFabric.composition).map(([material, percentage]) => ({
      materialName: material,
      percentage
    }));
  
    setEditComposition(compositionArray);
  
    // Calculate the total percentage
    const initialTotal = compositionArray.reduce((sum, item) => sum + item.percentage, 0);
    setTotalPercentage(initialTotal);
  
  }, [modelResponse]);

  // edit composition
  const handleCompositionChange = (index, field, value) => {
    const updatedComposition = [...editComposition];
    updatedComposition[index][field] = value;
    setEditComposition(updatedComposition);
};

  // edit sample_id
  const handleSampleIdChange = (newSampleId) => {
    setFabric(prevState => ({
      ...prevState,
      sample_id: newSampleId
    }));
  };
  
  //save edits
  const saveEdits = () => {
    const newComposition = editComposition.reduce((acc, { materialName, percentage }) => {
        acc[materialName] = Number(percentage); // Ensure percentage is stored as a number
        return acc;
    }, {});
    setFabric(prevState => ({ ...prevState, composition: newComposition }));
    setIsEditing(false);
};

  //Save composition in database
  const confirmComposition = async () => {
    //retrieve API
    const apiEndpoint =awsmobile.aws_cloud_logic_custom.find(service => service.name === "compositionApi").endpoint
    try {
      const payload = {
        ...fabric,
        imageKey: imageKey //imported from camera
      };
        const response = await axios.post(`${apiEndpoint}/savefabric`, payload);
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div>
                <h1>Fabric Composition</h1>
                <h4>{fabric.sample_id}</h4>
                {!isEditing ? (
                    <>
                      <div className='fabric-list'>
                          <ul>
                              {editComposition.map(({ materialName, percentage }, index) => (
                                  <li key={index}>{materialName}: {percentage}%</li>
                              ))}
                          </ul>
                      </div>
                        <br></br>
                        <div>Total Percentage: <strong>{totalPercentage.toFixed(2)}%</strong></div> {/* Display the total percentage */}
                        <div className='button-container'>
                          <button className="button" onClick={() => setIsEditing(true)}>Edit</button>
                          <button className="button" onClick={confirmComposition} disabled={!checkCompositionSum()}>Confirm</button>
                        </div>
                    </>
                ) : (
                    <>
                      <div className='edit-container'>
                        <label>ID: </label>
                        <input 
                            type="text"
                            value={fabric.sample_id}
                            onChange={(e) => handleSampleIdChange(e.target.value)}
                            placeholder="Edit Sample ID"
                        />
                      </div>

                      {editComposition.map(({ materialName, percentage }, index) => (
                          <div className= 'edit-container' key={index}>
                              {/* <input
                                  type="text"
                                  value={materialName}
                                  onChange={(e) => handleCompositionChange(index, 'materialName', e.target.value)}
                              /> */}
                              <label>{materialName}: </label>
                              <input
                                  type="number"
                                  value={percentage}
                                  onChange={(e) => handleCompositionChange(index, 'percentage', e.target.value)}
                              />
                          </div>
                        ))}
                        <div className='button-container'>
                          <button className="button" onClick={saveEdits}>Save Changes</button>
                        </div>
                        
                    </>
                )}
            </div>
        </div>
    </div>
);
};

export default Form;