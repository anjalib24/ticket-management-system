const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const Ticket = require("./models/Ticket");

const app = express();

require("dotenv").config();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
connectDB();

app.post("/tickets", async (req, res) => {
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
});

app.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).send(tickets);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/tickets/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).send();
    res.status(200).send(ticket);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/tickets/:id", async (req, res) => {
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
});

app.delete("/tickets/:id", async (req, res) => {
  const ticketId = req.params.id;

  try {
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    await ticket.remove();

    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
