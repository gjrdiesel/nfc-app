let db = {
    username: 'root',
    password: null,
    database: 'nfc',
    host: 'localhost',
    dialect: 'mariadb',
};

module.exports = {
    development: db,
    test: db,
    production: db
};
