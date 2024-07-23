
const mongoose = require('mongoose');
const Admin = require('../models/admin');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/edc', {
    
});

// Function to create the initial admin user
async function createAdmin() {
    const username = 'EDC_2024'; // Change to your desired username
    const password = 'Edc@123'; // Change to your desired password

    try {
        
        const admin = new Admin({ username, password });

        await admin.save();
        console.log('Admin user created successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error creating admin user:', err);
        mongoose.connection.close();
    }
}

createAdmin();
