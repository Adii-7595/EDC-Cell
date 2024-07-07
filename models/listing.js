const mongoose = require("mongoose")
const Schema = mongoose.schema

const listingSchema = new Schema({
    "email": {
      "type": "string",
      "title": "Email Address",
      "required": true,
      "format": "email"
    },
    "contact_number": {
      "type": number,
      "title": "Contact Number",
      "required": true,
      
    },
   
    "name": {
      "type": "string",
      "title": "What's your Name?",
      "required": true
    },
    "enrollment_number": {
      "type": "string",
      "title": "What's your Enrollment Number?",
      "required": true
    },
    "applicant_category": {
      "type": "string",
      "title": "Applicant Category",
      "enum": ["Parul University Student", "Parul University Staff member", "Parul University Alumni", "Others"],
      "required": true
    },
    "applicant_category_other": {
      "type": "string",
      "title": "If Others then Please Specify",
      "required": false
    },
    "team_members": {
      "type": "string",
      "title": "Name of all your Team Members",
      "required": true
    },
    "title": {
      "type": "string",
      "title": "Title of the Startup/Idea/Innovation",
      "required": true
    },
    "problem_statement": {
      "type": "string",
      "title": "Define the Problem that your Startup is solving.",
      "required": true
    },
    "solution_description": {
      "type": "string",
      "title": "Describe the Solution",
      "required": true
    },
    "uniqueness": {
      "type": "string",
      "title": "Explain the uniqueness and distinctive features of the (product / process / service) Solution",
      "required": true
    },
    "college": {
      "type": "string",
      "title": "Select your College",
      "enum": ["Select...", "College of Engineering", "College of Business", "College of Arts", "College of Science"],
      "required": true
    },
    "current_stage": {
      "type": "string",
      "title": "Current Stage of Startup",
      "enum": ["Idea", "Prototype Stage (If you have developed any working prototype of a Solution proposed)", "Startup Stage (If you have developed a final marketable product/service platform)"],
      "required": true
    }
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;