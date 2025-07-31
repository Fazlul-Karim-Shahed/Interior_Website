const express = require("express");
require("express-async-errors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const compression = require("compression");
const _ = require("lodash");
const path = require("path");
const AuthRouters = require("./Routers/AuthRouters");
const ServiceRouters = require("./Routers/ServiceRouters");
const ProjectRouters = require("./Routers/ProjectRouters");
const SettingsRouters = require("./Routers/SettingsRouters");
const VideosRouters = require("./Routers/videoRouters");
const cron = require("node-cron");
const axios = require("axios");

// ------------ Configuration ------------  //

dotenv.config();
const app = express();
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.options("*", cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(compression());



// ------------ Database ------------  //
const DB = process.env.MONGODB_DATABASE;
mongoose.set("strictQuery", false);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((data) => {
        console.log("Successfully connected to Misoran Interior MongoDB Remote Server!");
        // syncProductsToAlgolia(); // ✅ Sync here
    })
    .catch((data) => {
        console.log("Something went wrong with MongoDB Server");
        console.log(data);
    });

// ------------ All Routers ------------ //

app.use("/api/uploads/:name", (req, res) => {
    res.sendFile(path.resolve("./uploads/" + req.params.name));
});

app.use("/api/auth", AuthRouters);
app.use("/api/service", ServiceRouters);
app.use("/api/project", ProjectRouters);
app.use("/api/settings", SettingsRouters);
app.use("/api/videos", VideosRouters);

app.get("/", (req, res) => res.sendFile(path.resolve("./Server.html")));

// Express async error handlers
app.use((err, req, res, next) => {
    console.error("Server error: ", err);
    res.status(500).send(err.message);
});


const port = 4444;

cron.schedule("*/13 * * * *", async () => {
    try {
        const response = await axios.get("https://misoraninterior-kqb8.onrender.com"); // Replace with your server URL
        console.log("Server is up and running:");
    } catch (error) {
        console.error("Error hitting server:", error.message);
    }
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
