const { getPool } = required('../config/database');
const Paquet = require('../models/Paquet.model');

class PaquetRepository {
    async findAll(){
        const pool = getPool();
        const [rows] = await pool.query('SELECT * FROM packets ORDER BY id DESC');
        return rows.map(row => new Paquet(row.id, row.name, row.description, row.user_id,row.created_at));
    }

    async findByid(id){
        const pool = getPool();
        const [rows] = await pool.query('SELECT * FROM packets WHERE id = ?', [id]);
        if (rows.length === 0 ) return null;

        const row = rows[0];
        return new Paquet(row.id, row.name, row.description, row.user_id,row.created_at);
    }
    
    async findByIdWithCards(id) {
        const pool = getPool();
        
        // on récupère le paquet
        const [paqRows] = await pool.query('SELECT * FROM packets WHERE id = ?', [id]);
        if (paqRows.length === 0) return null;
        
        // on récupère ses cartes
        const [cardRows] = await pool.query(
            'SELECT * FROM cards WHERE packet_id = ? ORDER BY id', 
            [id]
        );
        
        const paq = new Paquet(
            paqRows[0].id, paqRows[0].name, paqRows[0].description,
            paqRows[0].user_id, paqRows[0].created_at
        );
        
        paq.cards = cardRows.map(row => ({
            id: row.id,
            question: row.question,
            answer: row.answer,
        }));
        
        return paq;
    }

    async create(paquetData) {
        const pool = getPool();
        const [result] = await pool.query(
            'INSERT INTO packets (name, description, user_id) (?,?,?)',
            [paquetData.name, paquetData.description, paquetData.user_id]
        );
        return this.findByid(result.insertId)
        }
    async update(paquetData){
        const pool = getPool();
        const [result] = await pool.query(
            'UPDATE packets SETS name = ?, description = ? ', 
            [paquetData.name, paquetData.description ]
        );
        if (result.affectedRows === 0) return null;
        return this.findByid(id);
    }
    
    async delete(id){
        const pool = getPool();
        const [result] = await pool.query('DELETE FROM decks WHERRE id = ?', [id]);
        return result.affecteRows > 0;
    }   
 }
 module.exports = new PaquetRepository();