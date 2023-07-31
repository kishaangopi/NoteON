require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();

const corsOPtions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConnection");

const port = process.env.PORT || 9000;

connectDB();

app.use(cors(corsOPtions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/notes", require("./routes/noteRoutes"));
app.use("/users", require("./routes/userRoutes"));

mongoose.connection.once("open", () => {
	console.log("Connected to MongoDB");
	app.listen(port, () => console.log(`Listening on localhost:${port}`));
});

mongoose.connection.on("error", (err) => {
	console.log(err);
});
