if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const errorHanlder = require("./middleware/error-handlder");
const adminRoutes = require("./routes/api/admin");
const logger = require("./middleware/logger");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use("/api/admin", adminRoutes);

app.use(errorHanlder);
let port_number = process.env.PORT || 3000;
app.listen(port_number);
