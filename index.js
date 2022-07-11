require('dotenv').config();

const { PORT = 3000 } = process.env;
const express = require('express');
const server = express();


const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));


const cors = require('cors');
server.use(cors());

server.use((req, res, next) => {
  console.log("<____Body Logger START____>");
  console.log(req.body);
  console.log("<_____Body Logger END_____>");

  next();
});

const apiRouter = require('./api');
server.use('/api', apiRouter);

const client = require('./db/client');
client.connect();
server.listen(PORT, function () {
    console.log(`The SERVER HAS STARTED ON PORT: ${PORT}`, server);
  })
  //   Fix the Error EADDRINUSE
  .on("error", function (err) {
    process.once("SIGUSR2", function () {
      process.kill(process.pid, "SIGUSR2");
    });
    process.on("SIGINT", function () {
      // this is only called on ctrl+c, not restart
      process.kill(process.pid, "SIGINT");
    });
  });