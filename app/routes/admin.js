// Joi
const Joi = require('joi');
// set up express router
const router = require('express').Router();
// require bcrypt
// const bcrypt = require('bcrypt');
// admin model
let Admin = require('../models/admin.model');
// import signUp validation and helper functions
// import { signUp } from '../validations/admin';
const validations = require('../validations/admin');
// import { parseError, sessionizeUser } from '../util/helpers';
const helpers = require('../util/helpers');

// get login form
router.route('/').get((req, res) => {
    Admin.find()
        .then(admin => res.json(admin))
        .catch(err => res.status(400).json("Error(get admin): " + err))
});

// post new admin login
router.route('/').post((req, res) => {
    const { Username, Password } = req.body;

    Joi.validate({ Username, Password }, validations.signUp)
        .then(() => {
            // const pwHash = bcrypt.hash(Password, 10);
        
            // encrypt Password and send to db
            const newAdmin = new Admin({
                Username,
                Password,
            });
        
            const sessionUser = helpers.sessionizeUser(newAdmin);
        
            newAdmin.save()
                .then(() => {
                    req.session.user = sessionUser;
                    res.send(sessionUser);
                })
                .catch(err => res.status(400).json('Error(Admin add new router): ' + helpers.parseError(err)));
            
        })
        .catch(err => res.status(400).send(helpers.parseError(err)));


});

module.exports = router;