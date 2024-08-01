const express = require("express");
const app = express();
const port = 3000;
const dotenv = require('dotenv');

dotenv.config(); // Move dotenv.config() to the top

const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const dbUrl = process.env.DATABASE_URL;

const mongoURL = dbUrl;
const StartupApplication = require("./models/StartupApplication");

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));
app.use(express.static(path.join(__dirname, '/image')));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Session middleware configuration
app.use(session({
    secret: process.env.SESSION_SECRET, // Use a strong secret key
    resave: false,
    saveUninitialized: true
}));

// Route setup
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// MongoDB setup
mongoose.connect(mongoURL, {
    useNewUrlParser: true, // Uncomment these options
    useUnifiedTopology: true // Uncomment these options
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((e) => {
    console.log(e);
});

// Routes
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
        res.render("successfull.ejs");
    } catch (error) {
        console.error("Error submitting form:", error);
        res.render("includes/error.ejs", { error });
    }
});

// Uncomment to enable admin route
app.get("/admin", async (req, res) => {
    const allData = await StartupApplication.find({});
    res.render("includes/admin.ejs", { allData });
});

app.get("/apply/home", (req, res) => {
    res.redirect("/");
});
app.get("/facility", (req, res) => {
    res.render("facility.ejs");
});

// Start server
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});
