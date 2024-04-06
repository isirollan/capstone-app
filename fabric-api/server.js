const express = require('express');
const cors = require('cors');  // Import CORS module
const app = express();

app.use(cors());  // Enable CORS for all routes

const port = 3000;

// Define the JSON data
const fabricData = {
  name: "Sample Fabric",
  composition: [
    { material: "Cotton", percentage: 90 },
    { material: "Nylon", percentage: 5 },
    { material: "Viscose", percentage: 3 },
    { material: "Spandex", percentage: 2 }
  ]
};

// // Root endpoint to guide users
// app.get('/', (req, res) => {
//   res.send('Welcome to the Fabric API. Access the fabric data at /fabric');
// });

// Route to serve the JSON data
app.get('/fabric', (req, res) => {
  res.json(fabricData);
});

// // Start the server
// app.listen(port, () => {
//   console.log(`Fabric API listening at http://localhost:${port}`);
// });

// POST endpoint to receive fabric composition confirmation
app.post('/confirm-fabric', (req, res) => {
  console.log("Received fabric confirmation:", req.body);
  // Here you would typically insert the data into a database
  res.status(200).send("Fabric composition confirmed");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});