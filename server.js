const express = require("express");
const colors = require("colors/safe");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

dotenv.config();

//mongo connection
connectDB();

//rest
const app = express();

//middleware
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", require('./routes/userRoutes.js'));
app.use("/api/v1/admin", require('./routes/adminRoutes.js'));
app.use("/api/v1/stylist", require('./routes/stylistRoutes.js'));

const port = process.env.PORT || 8001;
app.listen(port, () => {
  console.log(`Server running on port ${colors.blue(process.env.PORT)}`);
});
