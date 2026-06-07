const express = require('express');
const router = express.Router();
const CardController = require('../controllers/card.controller');
const cardController = require('../controllers/card.controller');
const {ValidCard} = reuire('../validator/card.validator');

router.get('/', cardController.getCardsbyPaq);
router.get('/:id',CardController.getCardbyid);
router.post('/',ValidCard, CardController.createCard);
router.put('/:id',ValidCard, CardController.updateCard);
router.delete('/:id',CardController.deleteCard);

module.exports = router;