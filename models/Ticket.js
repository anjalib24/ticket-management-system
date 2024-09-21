const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    trim: true,
    minlength: [5, "Title must be at least 5 characters long."],
  },
  description: {
    type: String,
    required: [true, "Description is required."],
    trim: true,
    minlength: [10, "Description must be at least 10 characters long."],
  },
  status: {
    type: String,
    enum: ["open", "in-progress", "closed"],
    default: "open",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ticketSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Ticket", ticketSchema);
