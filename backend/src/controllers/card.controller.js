const Card = require('../models/Card.model');
const CardService = require('../services/card.service');

class CardController {
   

    async getCardbyid(req,res,next){
        try {
            const {id} = req.params;

            const card = await CardService.getCardbyid(id);

            if(!card){
                return res.status(404).json({
                    success: false, message: "Carte introuvable"
                });
            } 
            res.json({
                success: true,
                data: card
            });

        }catch (err){
            next(err);
        }
    }

    async getCardsbyPaq(req,res,next){
        try{  
            const {paq_id} = req.params;

            const card = await CardService.getCardsbyPaq(paq_id);

            if(!card){
                return res.status(404).json({
                    success: false, message: "Carte introuvable"
                });
            } 
            res.json({
                success: true,
                data: card
            });
 
        }catch (err){
            next(err);
        }
    }

    async createCard(req, res, next) {
        try{
            const card = await CardService.createCard(req.body);
            res.status(201).json({
                success: true,
                message: 'Carte cree avec success',
                data: card
            });
        } catch(err){
            next(err)
        }
    }

    async updateCard(req, res, next){
        try{
            const {id} = req.params;
            const card = await CardService.updateCard(id, req.body);

            res.json({
                success: true,
                message: 'Carte mise a jour',
                data: paquet
            });
        }catch(err){
            next(err);
        }
    }

    async deleteCard(req, res, next){
        try{
            const {id} = req.params;
            await CardService.deleteCard(id);

            res.json({
                success: true,
                message: "Carte supprimé avec success"
            });
        }catch(err){
            next(err);
        }
    }
}
module.exports = new CardController();