const app = require('express')();
const http = require('http').Server(app);
const fs = require('fs');
const cors = require('cors');
const io = require('socket.io')(http);
const port = process.env.PORT || 8000;

// Register middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

http.listen(port, () => console.log(`Listening on port *:${port}`)});
