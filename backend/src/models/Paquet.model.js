class Paquet{
    constructor(id, name, description, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.cards = [];
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            cards: this.cards.length > 0 ? this.cards : undefined
        };
    }
}

module.exports = Paquet;