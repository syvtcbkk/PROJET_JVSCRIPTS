const dotenv = reauire('dotenv');
dotenv.config();

module.exports = {

    port: process.env.PORT || 5000,
    db: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnection: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    env: process.env.NODE_ENV || 'development'
}