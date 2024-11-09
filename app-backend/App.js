const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8082;

const mongoUri = process.env.DATABASE;
mongoose.set("strictQuery", false);
mongoose
  .connect(mongoUri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("MongoDB Database connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
// Import Routes 
const AuthRoutes = require("./routes/authRoutes"); 

// Use Routes 
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(cookieParser()); 

app.use("/api/v1", AuthRoutes); 

app.listen(PORT , ()=> console.log("Server is running on Port : " + PORT))
