const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

connectDB();

const app = express();

// CORS configuration - allow requests from any origin
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: false,
  optionsSuccessStatus: 200
}));

app.use(express.json());

// Auth Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Certificate Routes
app.use("/api/certificates", require("./routes/certificateRoutes"));

app.get("/", (req,res)=>{
    res.send("🚀 BlockCert Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});
