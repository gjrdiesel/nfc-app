const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'static')));
const bodyParser = require('body-parser');
const models = require('../models');

const {execSync} = require('child_process');

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/members', function (req, res) {
    models.Member.findAll().then(m => res.send(m));
});

app.get('/ip', function (req, res) {
    const ip = execSync('ifconfig | grep "inet "')
        .toString()
        .split("\n")
        .map(s => (s.trim().split('inet ')[1] || '').split(' ')[0])
        .filter(f => f && f !== '127.0.0.1');
    res.send(ip);
});

app.get('/entries', function (req, res) {
    models.Entry.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
        include: [models.Member]
    }).then(entries => {
        res.send(entries.map(e => e.Member))
    });
});

app.post('/member', function (req, res) {
    const member = req.body;

    models.Member
        .findByPk(member.id)
        .then(m => m.update(member))
        .then(() => models.Member
            .findAll()
            .then(res.send)
        );
});

app.post('/member/create', function (req, res) {
    const member = req.body;
    models.Member.create(member).then(() => res.send({status: 'ok'}));
});

module.exports = app;
