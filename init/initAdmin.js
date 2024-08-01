const mongoose = require('mongoose');
const Admin = require('../models/admin');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const dbUrl = process.env.DATABASE_URL;

// Connect to MongoDB
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Function to create the initial admin user
async function createAdmin() {
    const username = 'EDC_2024'; // Change to your desired username
    const password = 'Edc@123'; // Change to your desired password

    try {
        const admin = new Admin({ username, password });

        await admin.save();
        console.log('Admin user created successfully');
    } catch (err) {
        console.error('Error creating admin user:', err);
    } finally {
        mongoose.connection.close();
    }
}

createAdmin();
