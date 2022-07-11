// create the express server here
require('dotenv').config();

const {PORT = 3000} =process.env

const express = require('express');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

const cors = require('cors');
server.use(cors());

const bodyParser = require('body-parser');
server.use(bodyParser.json())

const apiRouter = require('./api');
server.use('/api', apiRouter);

server.use((err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send("Something Failed!")
})

const {client} = require('./db')

server.listen(PORT, ()=>{
    console.log('The server is listening on port', PORT)
    client.connect();
})