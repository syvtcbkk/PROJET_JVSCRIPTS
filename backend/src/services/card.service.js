const cardRepository = require('../repositories/card.repository');

class CardService{

    async getCardsbyPaq(paq_id){
        if(!paq_id){
            throw new err('Paquet introuvable');
        }
        return cardRepository.getCardsbyPaq(paq_id); 
    }

    async getCardbyId(id){
        if(!id){
            throw new err('Carte introuvable');
        }
        return cardRepository.getCardbyId(id);
    }

    async createCard(cardData){
         if(!cardData.question || cardData.question.trim()===''){
                throw new err('La question est obligatoire');
            }
    
            if(!cardData.answer || cardData.answer.trim()===''){
                throw new err('La reponse est obligatoire');
            }
    
            return await cardRepository.createCard(cardData);
    }

     async updateCard(cardData){
        const existing = await cardRepository.findByid(id);
        if(!existing){
            throw new err('Carte introuvable');

        }
        return cardRepository.update(cardData);
    
    }

    async deleteCard(id){
        const existing = await cardRepository.findByid(id);
        if(!existing){
            throw new err('Carte introuvable');

        }    
        return cardRepository.delete(id);
    }

    
    }

