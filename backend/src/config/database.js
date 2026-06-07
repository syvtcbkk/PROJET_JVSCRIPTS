const mysql = require('mysql/promise');
const config = require('./env');

let pool = null;

const initializeDatabase = async () => {
    try {
        pool = await mysql.createPool(config.db);
        console.log('connexion a MYSQL reussie');

        const connection = await pool.getConnection();
    }catch(err){
        if(!pool){
            throw new Error("Erreur ed conexion a la base de donnees: " + err.message);
        }
    }
}