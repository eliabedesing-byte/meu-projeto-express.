const express = require('express');
const controller = require('../controllers/UserController');

const router = express.Router();

router.get('/users', controller.index);
router.get('/users/:id', controller.show);
router.post('/users', controller.create);
router.put('/users/:id', controller.update);
router.delete('/users/:id', controller.delete);

module.exports = router;