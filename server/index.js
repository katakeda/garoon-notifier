const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');
const cors = require('cors');
const io = require('socket.io')(http);
const port = process.env.PORT || 8000;

const ApiController = require('./Controllers/ApiController');
const SocketController = require('./Controllers/SocketController');

// Register middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Register handler for api routes
app.post("/api/getGaroonEvents", ApiController.getGaroonEvents);

// Register handler for socket.io
io.on("connection", SocketController.handleConnection);

http.listen(port, () => console.log(`Listening on port *:${port}`));
