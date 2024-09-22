const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

require("dotenv").config();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
connectDB();

app.use("/api", ticketRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
