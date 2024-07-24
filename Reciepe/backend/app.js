const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const db=require('./util/db')

const app = express();


//const authJwt = require('./helpers/jwt');
//const errorHandler = require('./helpers/error-handler');

app.use(cors());
app.options('*', cors());

//Middlewares
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use(morgan('tiny'));
//Routes
const userroutes=require('./controller/User')
const reciperoutes=require('./controller/Receipe')

app.use('/' ,userroutes);
app.use('/',reciperoutes)
//const dbConfig = require('./config/database.config.js');


//  listen for requests
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
