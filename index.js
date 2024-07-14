const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.use(express.static(path.join(__dirname, '/image')));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const mongoose = require("mongoose");
const mongoURL = "mongodb://127.0.0.1:27017/edc";
const StartupApplication = require("./models/");

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((e) => {
    console.log(e);
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/service", (req, res) => {
    res.render("service");
});

app.get("/apply", (req, res) => {
    res.render("form");
});

app.get("/achievements", (req, res) => {
    res.render("achievement");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/submit", async (req, res) => {
    try {
        const {
            email,
            contact,
            name,
            enrollment,
            category,
            teamMembers,
            startupTitle,
            problemStatement,
            solutionDescription,
            uniqueness,
            college,
            stage
        } = req.body;

        const teamMembersArray = teamMembers ? teamMembers.split(',').map(member => member.trim()) : [];

        const newApplication = new StartupApplication({
            email,
            contact,
            name,
            enrollment,
            category,
            teamMembers: teamMembersArray,
            startupTitle,
            problemStatement,
            solutionDescription,
            uniqueness,
            college,
            stage
        });

        await newApplication.save();
        res.send("Form submitted successfully!");
    } catch (error) {
        console.error("Error submitting form:", error);
        res.status(500).send("Error submitting form");
    }
});

app.listen(port, () => {
    console.log(`The server is running on port: http://localhost:${port}`);
});
