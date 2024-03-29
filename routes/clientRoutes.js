const express = require('express');
const router = express.Router();
const {
    getClients,
    getClient,
    addClient,
    getClientByUser,
    editClient,
    testClient
} = require('../controllers/clientController');

router.get('/:id', getClients);
router.get('/client/:id', getClient);
router.get('/user/:id', getClientByUser);
router.post('/', addClient);
router.put('/edit/:id', editClient);
router.post('/test', testClient);

module.exports = router;
