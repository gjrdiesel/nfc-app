const NFC = require('nfc-pcsc').NFC;
const nfc = new NFC(); // optionally you can pass logger

function handleFailure(io, err, type) {
    io.emit({err, type});

    // Let PM2 restart the process
    process.exit();
}

function log(io, name, data) {
    console.log(name, data);
    io.emit(name, data);
}

module.exports = function (io) {
    nfc.on('reader', reader => {
        reader.aid = 'F222222222';
        log(io, 'reader.on', reader);
        reader.on('end', reader => log(io, 'reader.off', reader));
        reader.on('card', card => log(io, 'card.on', card));
        reader.on('card.off', card => log(io, 'card.off', card));
        reader.on('error', err => handleFailure(io, err, 'reader'));
    });

    nfc.on('error', err => handleFailure(io, err, 'nfc'));
};
