// set up express router
const router = require('express').Router();
// require bcrypt
const bcrypt = require('bcrypt');

// admin model
let Admin = require('../models/admin.model');

// get login form
router.route('/admin').get((req, res) => {
    
});

// post login form
router.route('/admin').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Admin.findOne({ Username: username })
        .then(user => {
            console.log("user from login", user);
            if(!user){
                // user not found
                res.sendStatus(204);
            }else{
                // compare passwords
                bcrypt.compare(password, user.Password)
                    .then(pwMatch => pwMatch ? res.sendStatus(200) : res.sendStatus(204))
                    .catch(err => res.status(400).json('Error(post login form): ' + err));
            }   
        })
});

module.exports = router;