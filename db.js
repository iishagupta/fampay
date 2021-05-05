const mysql = require('mysql2');
const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

if(DB_HOST && DB_PORT && DB_USER && DB_PASS && DB_NAME) {
    // sabb theek hai
} else {
    throw new Error(`Cannot find DB Creds in env variables`);
}

const connection = mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
});

connection.connect(err => {
    if (err) {
        console.error('error connecting to database ' + err.stack);
        return;
    }
    console.log('Successfully Connected to Database');
});

const selectMultiple = async (query, ...args) => {
    const [rows] = await connection.promise().query(query, args);
    return rows;
};

const insertQuery = async (query, ...args) => {
    await connection.promise().query(query, args);
};

module.exports = {
    selectMultiple,
    insertQuery,
};
