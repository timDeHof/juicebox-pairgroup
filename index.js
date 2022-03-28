const express = require('express');
const morgan = require('morgan');
const apiRouter = require('./api');
const { client } = require('./db');
const PORT = 3000;
const server = express();

server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
  });

client.connect();


server.use('/api', apiRouter);
server.use(morgan('dev'));
server.use(express.json())

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});
