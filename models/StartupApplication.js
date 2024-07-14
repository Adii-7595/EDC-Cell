const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const startupApplicationSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    contact: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{10}$/, 'Please enter a valid contact number']
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    enrollment: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['student', 'staff', 'alumni', 'other']
    },
    teamMembers: {
        type: [String],
        default: []
    },
    startupTitle: {
        type: String,
        required: true,
        trim: true
    },
    problemStatement: {
        type: String,
        required: true
    },
    solutionDescription: {
        type: String,
        required: true
    },
    uniqueness: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true,
        enum: ['law', 'commerce', 'PIET', 'PIT', 'PIETD', 'other']
    },
    stage: {
        type: String,
        required: true,
        enum: ['idea', 'prototype', 'startup']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const StartupApplication = mongoose.model('StartupApplication', startupApplicationSchema);

module.exports = StartupApplication;
