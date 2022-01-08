if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const app = express();

const adminRoutes = require("./routes/api/admin");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", adminRoutes);

let port_number = process.env.PORT || 3000;
app.listen(port_number);
