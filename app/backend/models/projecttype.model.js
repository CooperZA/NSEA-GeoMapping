// require mongoose
const mongoose = require('mongoose');

// mongoose schema class
const Schema = mongoose.Schema;

// Project Type Schema
const projectType = new Schema({
    ProjectType: { type: String, trim: true, required: true }
});

// create mongoose model
const ProjectType = mongoose.model('ProjectType', projectType);

// export project type model
module.exports = ProjectType;