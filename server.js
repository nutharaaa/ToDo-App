const express = require("express");

const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");

const routes = require("./routes/TodoRoute");

const app = express();
const PORT = process.env.PORT | 5000;

app.use(express.json());
app.use(cors());

// Routes
app.use(routes);

mongoose
    .connect(process.env.MONGO_URL, {
        
    })
    .then(() => console.log("Mongodb Connected..."))
    .catch((err) => console.error(err));


app.listen(PORT, () => console.log("Server running on port " + PORT));