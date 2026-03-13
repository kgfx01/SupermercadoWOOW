const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');


router.post('/login', usuariosController.login); 
router.post('/registrar', usuariosController.registrar); 
router.get('/', usuariosController.getUsuarios); 

module.exports = router;