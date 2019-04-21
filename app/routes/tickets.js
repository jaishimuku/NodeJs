const express = require('express');
const router = express.Router();
const Ticket = require('../model/ticket');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const ticketController = require('../controllers/tickets');

//get all the tickets
router.get('/',ticketController.tickets_get_all);

//single ticket
router.get('/:ticketID', checkAuth,ticketController.ticket_by_ID);

//create
router.post('/', checkAuth, ticketController.tickets_create);

//delete
router.delete('/:ticketID', checkAuth, ticketController.ticket_delete_ID)

//update
router.put('/:ticketID', checkAuth,ticketController.ticket_update);

module.exports = router;