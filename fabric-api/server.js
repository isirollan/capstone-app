const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

// Data for the fabric
const fabric = {
  name: "Sample Fabric",
  composition: [
    { material: "Cotton", percentage: 90 },
    { material: "Nylon", percentage: 5 },
    { material: "Viscose", percentage: 3 },
    { material: "Spandex", percentage: 2 }
  ]
};

// API endpoint that returns the fabric data
app.get('/fabric', (req, res) => {
  res.json(fabric);
});

app.listen(port, () => {
  console.log(`Fabric API listening at http://localhost:${port}`);
});

//This code defines a simple API with one endpoint (/fabric) that returns the fabric data when accessed