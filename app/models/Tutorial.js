const db = require('../database');

const { ObjectId } = require('mongodb');

const collection = db.then(db => db.collection('list'));

class Tutorial {
    constructor(data) {
        for(const prop in data){
            this[prop] = data[prop];
        }
    }

    static async findAll() {
        const tutorialsCursor = (await collection).find();
        const tutorials = await tutorialsCursor.toArray();
        return tutorials.map(tutorial => new Tutorial(tutorial));
    }

    static async findOne(id) {
        const tutorial = await (await collection).findOne({ "_id": new ObjectId(id)});
        return new Tutorial(tutorial);
    }

    static async findByIdAndUpdate(id, data) {
        const tutorialUpdateResult = await (await collection).updateOne(
            { "_id": new ObjectId(id) },
            { $set: data }
        );

        return tutorialUpdateResult.modifiedCount;
    }

    static async findByIdAndRemove(id) {
        const tutorialRemoveResult = await (await collection).deleteOne(
            { "_id": new ObjectId(id) }            
        );

        return tutorialRemoveResult.deletedCount;
    }

    static async findByTitle(title) {
        console.log(title);
        const tutorials = await (await collection).find({ "title": title });
        console.log(tutorials);
        return tutorials.map(tutorial => new Tutorial(tutorial));;
    }

    static async deleteAll() {
        const deletedAllResult = await (await collection).deleteMany({});

        return deletedAllResult.deletedCount;
    }

    async create() {
        await (await collection).insertOne(this);
    }
}

module.exports = Tutorial;