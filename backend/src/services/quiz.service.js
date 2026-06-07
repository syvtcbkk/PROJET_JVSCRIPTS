const cardRepository = require('../repositories/card.repository');
const cardrepository = require('../repositories/card.repository');

class QuizService {

    async getquizCards(deckId){
        const cards = await cardrepository.findByPaquet(paq_id);
        if(cardrepository.length ===0 ){
            throw new err('Ce pauet est vide');
        }
             // Optionnel: Mélanger les cartes pour le quiz
        const shuffledCards = [...cards];
        for (let i = shuffledCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
        }
        
        return shuffledCards.map(card => ({
            id: card.id,
            question: card.question,
            answer: card.answer,
        }));
    }

    async showAnswer(cardId){
        const card = cardRepository.findById(cardId);
        if(!cards){
            throw new err('cette carte est introuvable')
        }

        return await card;
    }

}
module.exports = new QuizService(); 