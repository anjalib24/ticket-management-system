const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");

router.post("/tickets", ticketController.createTicket);

router.get("/tickets", ticketController.getAllTickets);

router.get("/tickets/:id", ticketController.getTicketById);

router.put("/tickets/:id", ticketController.updateTicketById);

router.delete("/tickets/:id", ticketController.deleteTicketById);

module.exports = router;
