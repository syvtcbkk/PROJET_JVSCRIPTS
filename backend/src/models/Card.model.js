class Card {
    constructor(id, paq_id, question, answer, createdAt) {
        this.id = id;
        this.deckId = paq_id;
        this.question = question;
        this.answer = answer;
        this.createdAt = createdAt;
    }

    toJSON() {
        return {
            id: this.id,
            paq_id: this.paq_id,
            question: this.question,
            answer: this.answer,
            createdAt: this.createdAt
        };
    }
}

module.exports = Card;