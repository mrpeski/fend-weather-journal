// Setup empty JS object to act as endpoint for all routes
let projectData = {};


// Require Express to run server and routes
const port = '3001';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())

app.route('/project')
    .get( function(req, res){
        res.send(projectData);
    }).post(function(req, res){
        projectData = req.body;
        console.log("From client", req.body);
        res.send(projectData)
    })

app.use(express.static('website'));

// Setup Server
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})