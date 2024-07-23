// routes/auth.js
const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const StartupApplication = require('../models/StartupApplication'); // Add this line
const bodyParser = require('body-parser');
const session = require('express-session');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));


// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the admin by username
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).send('Invalid username');
        }

        // Compare the provided password with the hashed password stored in the database
        
        const isMatch = await admin.comparePassword(password);
        console.log(password);
        

        if (!isMatch) {
            return res.status(400).send('Invalid password');
        }

        // If the password matches, create a session for the admin
        req.session.adminId = admin._id;
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

router.get('/admin', async (req, res) => {
    if (!req.session.adminId) {
        return res.status(401).send('Unauthorized');
    }
    const allData = await StartupApplication.find({});
    res.render("includes/admin.ejs", { allData });
});

module.exports = router;
