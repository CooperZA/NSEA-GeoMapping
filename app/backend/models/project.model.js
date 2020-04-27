// require mongoose
const mongoose = require('mongoose');

// mongoose schema class
const Schema = mongoose.Schema;

// project db schema
const projectSchema = new Schema({
    ProjectType: { type: String, required: true },
    CreekName: { type: String, required: true },
    Latitude: { type: Number, required: true },
    Longitude: { type: Number, required: true },
    ProjectDescription: { type: String, required: true },
    FunFact: { type: String, required: true },
    FishType: { type: String, required: true },
    ProjectUrl: { type: String, required: true },
});

// bind project var with schema
const Project = mongoose.model('Project', projectSchema);

// export project
module.exports = Project;