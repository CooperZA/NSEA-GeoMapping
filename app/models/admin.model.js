// require mongoose
const mongoose = require('mongoose');

// mongoose schema class
const Schema = mongoose.Schema;

// create admin schema
const adminSchema = new Schema({
    Username: { type: String, required: true, unique: true },
    Password: { type: String, required: true, minlength: 8 }
});

// create model from adminSchema obj
const Admin = mongoose.model('Admin', adminSchema);

// export
module.exports = Admin;