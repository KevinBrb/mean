const { Router } = require('express');

const tutorialController = require('./controllers/tutorialController');

const router = Router();

router.get('/', tutorialController.allTutorials);
router.post('/', tutorialController.insertTutorial);
router.get('/:id', tutorialController.oneTutorial);
router.get('/search/:title', tutorialController.tutorialWithTitle);
router.put('/:id', tutorialController.updateTutorial);
router.delete('/', tutorialController.deleteAllTutorial);
router.delete('/:id', tutorialController.deleteOneTutorial);

module.exports = router;
