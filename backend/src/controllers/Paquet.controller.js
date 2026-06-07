const PaquetService = require('../services/paquet.service');

class PaquetController {
    async getAllPaq(req, res, next){
        try{
            const Paquets = await PaquetService.getAllPaq();
            res.json(
                {
                    success: true,
                    data: Paquets,
                    count: Paquets.length
                });
        }catch(error){
            next(error);
        }
    }

    async getPaqbyid(req,res,next){
        try {
            const {id} = req.params;
            const includeCards = req.query.includeCards === 'true';

            const paquet = await PaquetService.getPaqbyid(id, includeCards);

            if(!paquet){
                return res.status(404).json({
                    success: false, message: "Paquet introuvable"
                });
            } 
            res.json({
                success: true,
                data: paquet
            });

        }catch (err){
            next(err);
        }
    }

    async createPaquet(req, res, next) {
        try{
            const paquet = await PaquetService.createPaquet(req.body);
            res.status(201).json({
                success: true,
                message: 'Paquet cree avec success',
                data: paquet
            });
        } catch(err){
            next(err)
        }
    }

    async updatePaquet(req, res, next){
        try{
            const {id} = req.params;
            const paquet = await PaquetService.updatePaquet(id, req.body);

            res.json({
                success: true,
                message: 'Paquet mis a jour',
                data: paquet
            });
        }catch(err){
            next(err);
        }
    }

    async deletePack(req, res, next){
        try{
            const {id} = req.params;
            await PaquetService.deletePack(id);

            res.json({
                success: true,
                message: "Paquet supprimé avec success"
            });
        }catch(err){
            next(err);
        }
    }
}
module.exports = new PaquetController();