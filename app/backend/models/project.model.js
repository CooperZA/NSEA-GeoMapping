// require mongoose
const mongoose = require('mongoose');

// mongoose schema class
const Schema = mongoose.Schema;

// project db schema
const projectSchema = new Schema({
    ProjectType: { type: String, required: true },
    CreekName: { type: String, required: true },
    Latitude: { type: Number, required: true, trim: true },
    Longitude: { type: Number, required: true, trim: true },
    ProjectDescription: { type: String, required: true },
    FunFact: { type: String, required: true },
    FishType: { type: String, required: true, trim: true },
    ProjectUrl: { type: String, required: true, trim: true },
});

// const projectSchema = new Schema({
//     projecttype: { type: String },
//     creekname: { type: String },
//     latitude: { type: Number },
//     longitude: { type: Number },
//     projectdescription: { type: String },
//     funfact: { type: String },
//     fishtype: { type: String },
//     projecturl: { type: String },
// });

// bind project var with schema
const Project = mongoose.model('Project', projectSchema);

// export project
module.exports = Project;