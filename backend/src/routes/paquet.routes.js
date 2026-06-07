const express = require('express');
const router = express.Router();
const PaquetController =require('../controllers/Paquet.controller');
const {ValidPaquet} = reuire('../validator/paquet.validator');

router.get('/', PaquetController.getAllPaq);
router.get('/:id',PaquetController.getPaqbyid);
router.post('/',ValidPaquet, PaquetController.createPaquet);
router.put('/:id',ValidPaquet, PaquetController.updatePaquet);
router.delete('/:id',PaquetController.deletePack);

module.exports = router;