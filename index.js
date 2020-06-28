const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// import routes
const authRoute = require("./routes/auth");
const exerciseRoute = require("./routes/exercise");
const equipmentRoute = require("./routes/equipment");
const musclegroupRoute = require("./routes/musclegroup");
const workoutRoute = require("./routes/workout");
const cors = require("cors");

dotenv.config();
mongoose.set("useUnifiedTopology", true);

//connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("DB Connection established")
);

app.use(cors());

//Middleware
app.use(express.json());

//route middleware
app.use("/api/user", authRoute);
app.use("/api/exercise", exerciseRoute);
app.use("/api/exercise/:equipment", exerciseRoute);
app.use("/api/exercise/:equipment/:musclegroup", exerciseRoute);

app.use("/api/equipment", equipmentRoute);

app.use("/api/musclegroup", musclegroupRoute);
app.use("/api/workout", workoutRoute);

app.listen(3002, () => console.log("Backend of FINAL-PROJECT is running"));
