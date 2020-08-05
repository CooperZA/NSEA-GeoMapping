// Joi
const Joi = require('joi');
// set up express router
const router = require('express').Router();
// require bcrypt
const bcrypt = require('bcrypt');
// admin model
let Admin = require('../models/admin.model');

// import signUp validation
import { signUp } from '../validations/admin';

// get login form
router.route('/').get((req, res) => {
    Admin.find()
        .then(admin => res.json(admin))
        .catch(err => res.status(400).json("Error(get admin): " + err))
});

// post new admin login
router.route('/').post((req, res) => {
    const { Username, Password } = req.body;

    Joi.validate({ Username, Password }, signUp);

    // const pwHash = bcrypt.hash(Password, 10);

    // encrypt Password and send to db
    const newAdmin = new Admin({
        Username,
        Password,
    });

    newAdmin.save()
        .then(() => res.send({ userId: newUser.id, Username}))
        .catch(err => res.status(400).json('Error(Admin add new router): ' + err));

    

    // Admin.findOne({ Username: Username })
    //     .then(user => {
    //         console.log("user from login", user);
    //         if(!user){
    //             // user not found
    //             res.sendStatus(204);
    //         }else{
    //             // compare passwords
    //             bcrypt.compare(Password, user.Password)
    //                 .then(pwMatch => pwMatch ? res.sendStatus(200) : res.sendStatus(204))
    //                 .catch(err => res.status(400).json('Error(post login form): ' + err));
    //         }   
    //     })
});

module.exports = router;