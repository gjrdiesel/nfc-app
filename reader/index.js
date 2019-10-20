const nfcLibrary = require('nfc-pcsc');
const nfc = new nfcLibrary.NFC(); // optionally you can pass logger
const models = require('../models');

function handleFailure(io, err, type) {
    log(io, 'server.crash', {err, type});
    // Let PM2 restart the process
    process.exit();
}

function log(io, name, data) {
    console.log(name, data);
    io.emit(name, data);
}

function matchMember(io, card) {
    models.Member.findOne({
        where: {uid: card.uid}
    }).then(m => saveSignIn(io, m))
}

function saveSignIn(io, member) {
    if (member) {
        log(io, 'member.sign_in', member);
        models.Entry.create({
            category: 'Test',
            MemberId: member.id
        })
    }
    else {
        log(io, 'member.no_match');
    }
}

module.exports = function (io) {
    nfc.on('reader', reader => {
        reader.aid = 'F222222222';
        log(io, 'reader.on', reader);
        reader.on('end', reader => log(io, 'reader.off', reader));
        reader.on('card', card => {
            log(io, 'card.on', card);
            matchMember(io, card);
        });
        reader.on('card.off', card => log(io, 'card.off', card));
        reader.on('error', err => handleFailure(io, err, 'reader'));
    });

    nfc.on('error', err => handleFailure(io, err, 'nfc'));
};
