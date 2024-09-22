const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const ticket = new Ticket({
      title,
      description,
      status,
    });

    await ticket.save();

    res.status(201).json(ticket);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "Validation failed",
        message: error.message,
        errors: error.errors,
      });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).send(tickets);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).send();
    res.status(200).send(ticket);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a ticket by ID
exports.updateTicketById = async (req, res) => {
  const ticketId = req.params.id;

  try {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    ticket.title = req.body.title || ticket.title;
    ticket.description = req.body.description || ticket.description;
    ticket.status = req.body.status || ticket.status;

    await ticket.save();

    res.status(200).json(ticket);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "Validation failed",
        message: error.message,
        errors: error.errors,
      });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteTicketById = async (req, res) => {
  const ticketId = req.params.id;

  try {
    console.log(`Deleting ticket with ID: ${ticketId}`);

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    console.log(`Found ticket: ${ticket}`);

    await Ticket.deleteOne({ _id: ticketId });

    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error(`Error deleting ticket: ${error}`);

    res.status(500).json({ error: "Internal server error" });
  }
};
