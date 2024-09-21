const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const Ticket = require("./models/Ticket");

const app = express();

require('dotenv').config();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
connectDB();

app.post("/tickets", async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).send(ticket);
  } catch (error) {
    res.status(400).send(error);
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
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!ticket) return res.status(404).send();
    res.status(200).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.delete("/tickets/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).send();
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
