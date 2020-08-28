const router = require('express').Router();
const Joi = require('joi');
const Admin = require('../models/admin.model');
// import functions
const validations = require('../validations/admin');
// import { parseError, sessionizeUser } from '../util/helpers';
const helpers = require('../util/helpers');

// check if user is signed in
router.route("/").get(({ session: { admin }}, res) => {
    res.send({ admin });
});

// create session
router.route("/").post((req, res) => {
    const { Username, Password } = req.body;

    Joi.validate({ Username, Password }, validations.signIn)
        .then(() => {
            const admin = Admin.findOne({ Username })
                .then(() => {
                    if (admin && admin.comparePasswords(Password)) {
                        const sessionAdmin = helpers.sessionizeUser(admin);

                        req.session.admin = sessionAdmin;
                        res.send(sessionAdmin);
                    } else {
                        throw new Error('Invalid login credentials');
                    }
                })
                .catch(err => res.status(400).send(parseError(err)));
        })
        .catch(err => res.status(400).send(parseError(err)));

});

// delete session
router.route("/").delete(({ session }, res) => {
    try {
        const admin = session.admin;
    
        if (admin) {
            session.destroy(err => {
                if (err) throw (err);
                res.clearCookie(process.env.SESS_NAME);
                res.send(admin);
            })
        } else {
            throw new Error('something went wrong');
        }
    } catch (err) {
        res.status(422).send(parseError(err));
    }
});

module.exports = router;