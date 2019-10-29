const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'static')));
const bodyParser = require('body-parser');
const models = require('../models');

const fileUpload = require('express-fileupload');
const {execSync} = require('child_process');

app.use(bodyParser.json());
app.use(fileUpload());

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

app.get('/restart', function (req, res) {
    res.send('ok!');
    setTimeout(process.exit, 300);
});

app.post('/import', function (req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let file = req.files.import;
    file.mv(__dirname + '/../models/members.csv');

    const output = execSync(`mysql -u root nfc --local-infile=1 < ${__dirname}/../models/setup.sql`).toString();

    res.send(output);
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
