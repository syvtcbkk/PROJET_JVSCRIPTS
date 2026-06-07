const { body } = require('express-validator');
const validate = require('../middlewares/validation.middleware');

const validateDeck = [
    body('name')
        .notEmpty().withMessage('Le titre est requis')
        .isLength({ max: 100 }).withMessage('Le titre doit faire moins de 100 caractères')
        .trim(),
    body('description')
        .optional()
        .isLength({ max: 500 }).withMessage('La description est trop longue'),
   
    validate
];

module.exports = { validateDeck };