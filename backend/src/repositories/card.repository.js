const {getPool} = require('../config/database');
const Card = require('../models/Card.model');

class CardRepository{

    async findByPaquet(deckid) {
        const pool = getPool();
        const rows = await pool.query(
            'SELECT * FROM cards WHERE packet_id = ? ORDER BY id'
        [paqId]);
        return rows.map(row => new Card(row.id, row.packet_id, rows.question, rows.answer));

    }

    async findById(id){
        const Pool = getPool();
        const [rows] = await pool.query(
            'SELECT * FROM cards WHERE id = ? ', [id]
        );
        if(rows.length === 0 ) return null;
        
        const row = rows[0];
        return new Card(
            row.id, row.packet_id, row.question, row.answer
        );
    }

    async create(cardData){
        const pool = getPool();
        const [result] = await pool.query(
            'INSERT INTO cards (packet_id, question, answer) (?,?,?)',[cardData.packet_id, cardData.question, cardData.answer]
        );
        return this.findById(result.inserId)
    }

    async update(cardData){
        const pool = getPool();
        const [result] = await pool.query(
            'UPDATE card SET question = ?, answer = ?, packet_id = ?' 
            [cardData.question, cardData.answer, cardData,packet_id]
        );

        if(result.affectedRows === 0) return null;
        return this.findById(id);
    }

    async delete(id){
        const pool = getPool();
        const [result] = await pool.query(
            'DELETE FROM card WHERE id = ?', [id]
        );
        return result.affectRows > 0;
     }
    async deletebypaqid(paq_id){

        const pool = getPool();
        const [result] = await pool.query(
            'DELETE FROM card WHERE packet_id = ?', [paq_id]
        );
        return result.affectRows > 0;

    }
}
module.exports = new CardRepository();