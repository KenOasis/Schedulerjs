if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const errorHanlder = require("./middleware/error-handlder");
const adminRoutes = require("./routes/api/admin-routes");
const groupRoutes = require("./routes/api/group-routes");
const morgan = require("morgan");
const httpLogger = require("./middleware/logger").httpLogger;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny", { stream: httpLogger.stream }));
app.use("/api/admin", adminRoutes);
app.use("/api/group", groupRoutes);

app.use(errorHanlder);
let port_number = process.env.PORT || 3000;
app.listen(port_number);
