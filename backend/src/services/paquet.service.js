const paquetRepository = require('../repositories/paquet.repository');
const cardrepository = require('../repositories/card.repository');

class PaquetService{
    async getAllPaqs(){
        return await paquetRepository.findAll();
    }

    async getPaqbyid(id, includeCard = false){
        if (includeCards){
            return await paquetRepository.findByIdWithCards(id);
        }
        return await paquetRepository.findByid(id);
    }

    async createPaq(paquetData){
        if(!paquetData.name || paquetData.name.trim()===''){
            throw new err('Le Nom du Paquet est obligatoire');
        }

        if(paquetData.name.length > 100){
            throw new err('Le Nom du paquet est trop long');
        }

        return await paquetRepository.createPaq(paquetData);
    }

    async updatePaq(paquetData){

        const existing = await paquetRepository.findByid(id);
        if(!existing){
            throw new err('Paquet introuvable');

        }
        return paquetRepository.update(paquetData);
    }

    async delPaq(id){

        const existing = await paquetRepository.findByid(id);
        if(!existing){
            throw new err('Paquet introuvable');

        }
        await cardrepository.delete(id)
        return paquetRepository.delete(id)

    }
}
module.export = new PaquetService;