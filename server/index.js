const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'static')));
const http = require('http').createServer(app);
const io = require('socket.io')(http);

require('../reader')(io);
const members = require('../members');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/members', function (req, res) {
    members.read().then(m => res.send(m));
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
