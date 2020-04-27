// set up express router
const router = require('express').Router();

// project model
let Project = require('../models/project.model');

// get
router.route('/admin/projects').get((req, res) => {
    // Finds and displays all projects
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error(get all projects): ' + err));
});

// add new
router.route('/admin/projects/add').post((req, res) => {
    const projType = req.body.projectType;
    const creekName = req.body.creekName;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const projDesc = req.body.projectDescription;
    const funFact = req.body.funFact;
    const fishType = req.body.fishType;
    const projUrl = req.body.projectUrl;

    // create new project
    const newProject = new Project({
        projType,
        creekName,
        latitude,
        longitude,
        projDesc,
        funFact,
        fishType,
        projUrl
    });

    newProject.save()
        .then(() => res.json('Project added!'))
        .catch(err => res.status(400).json('Error(Projects add new router): ' + err));
});

// edit (id passed in url)
router.route('/admin/projects/edit/:id').post((req, res) => {
    Project.findById(req.params.id)
        .then(project => {
            project.ProjectType = req.body.projectType;
            project.CreekName = req.body.creekName;
            project.Latitude = Number(req.body.latitude);
            project.Longitude = Number(req.body.longitude);
            project.ProjectDescription = req.body.projectDescription;
            project.FunFact = req.body.funFact;
            project.FishType = req.body.fishType;
            project.ProjectType = req.body.projectType;

            // save project
            project.save()
                .then(() => res.json('Project Successfully Updated'))
                .catch(err => res.status(400).json('Error(project update): ' + err));
        })
        .catch(err => res.status(400).json('Error(projects edit router): ' + err));
});


// delete
router.route('/admin/projects/:id').delete((req, res) => {
    Project.findByIdAndDelete(req.params.id)
        .then(() => res.json('Project Successfully Deleted'))
        .catch(err => res.status(400).json('Error(delete project): ' + err));
});

// details
// find by id
router.route('/admin/projects/:id').get((req, res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
        .catch(err => res.status(400).json('Error(project details): ' + err));
});

// export router for use in server.js
module.exports.router;