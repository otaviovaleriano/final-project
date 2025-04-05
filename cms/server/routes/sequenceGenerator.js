const Sequence = require('../models/sequence');

class SequenceGenerator {
    constructor(name) {
        this.name = name;
    }

    async nextId() {
        try {
            // Modify this to find the correct sequence in your database
            let sequence = await Sequence.findOne({}).exec();

            if (!sequence) {
                console.warn(`⚠️ Sequence not found. Creating a new one.`);
                sequence = new Sequence({ maxDocumentId: 1, maxMessageId: 1, maxContactId: 1 });
                await sequence.save();
            }

            // Match the sequence name correctly
            if (this.name === "documents") sequence.nextId = ++sequence.maxDocumentId;
            else if (this.name === "messages") sequence.nextId = ++sequence.maxMessageId;
            else if (this.name === "contacts") sequence.nextId = ++sequence.maxContactId;
            else throw new Error(`Unknown sequence name: ${this.name}`);

            await sequence.save();
            return sequence.nextId;
        } catch (error) {
            console.error('❌ Error generating sequence ID:', error);
            throw error;
        }
    }
}

module.exports = SequenceGenerator;
