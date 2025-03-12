const express = require('express');
const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

console.log('Server is starting ...');

// Provide static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Define another route
app.get('/about', (req, res) => {
  res.send('About Page');
});

// Endpoint to convert CSV to JSON
app.get('/convert', async (req, res) => {
  try {
    const csvFilePath = path.join(__dirname, 'cfg/pubfinder_list_NLA.csv'); // Path to your CSV file
    console.log("__dirname = %s", path.resolve(__dirname));
    console.log('filepath: ' + csvFilePath);
    const jsonArray = await csv({delimiter: ";"}).fromFile(csvFilePath);
    //console.log(jsonArray);
    res.json(jsonArray);
  } catch (error) {
    res.status(500).send('Error converting CSV to JSON');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
