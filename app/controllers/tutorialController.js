const Tutorial = require('../models/Tutorial');

const tutorialController = {
    allTutorials: async (_, res) => {
        const tutorials = await Tutorial.findAll();
        res.json(tutorials);
    },

    oneTutorial: async (req, res) => {
        const id = req.params.id;

        const tutorial = await Tutorial.findOne(id);
        res.json(tutorial);
    },

    insertTutorial: async (req, res) => {
        if(!req.body.title || !req.body.description) {
            res.status(400).json('Missing Content');
        }

        const tutorial = new Tutorial({
            title: req.body.title,
            description: req.body.description,
            published: req.body.published ? req.body.published : false,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        
        await tutorial.create();

        res.status(200).json(tutorial);
    },

    updateTutorial: async (req, res) => {
        if(!req.body) {
            res.status(400).json('No data');
        } else {
            const body = req.body;
            body.updatedAt = new Date();
    
            const updatedTutorial = await Tutorial.findByIdAndUpdate(req.params.id, body);

            if(updatedTutorial === 1) {
                res.status(200).json('data updated');
            } else if(updatedTutorial === 0) {
                res.status(400).json('Data not updated');
            } 
    
        }
    },

    deleteOneTutorial: async (req, res) => {
        if(!req.params.id) {
            res.status(400).json('No id found');
        } else {
            const id = req.params.id;

            const removedTutorial = await Tutorial.findByIdAndRemove(id);

            if(removedTutorial === 1) {
                res.status(200).json('data removed');
            } else if(removedTutorial === 0) {
                res.status(400).json('Data not removed');
            } 
        }        
    },

    deleteAllTutorial: async (_, res) => {
        const deletedTutorials = await Tutorial.deleteAll();
        
        if(deletedTutorials === 0) {
            res.status(400).json('No data removed');
        } else if(deletedTutorials > 0) {
            res.status(200).json(`${deletedTutorials} removed`);
        } 
    }
}

module.exports = tutorialController;