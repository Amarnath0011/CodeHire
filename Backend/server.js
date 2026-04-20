const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");


dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use( "/api/applications", require("./routes/applicationRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));




app.get("/", (req, res) => {
  res.send("CodeHire API Running");
});
app.get("/test", (req, res) => {
  res.send("working");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(`Server running on ${PORT}`)
);
