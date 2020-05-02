// require mongoose
const mongoose = require('mongoose');

// mongoose schema class
const Schema = mongoose.Schema;

// Fish Type schema
const fishTypeSchema = new Schema({
    FishType: { type: String, required: true }
});

// create FishType model
const FishType = mongoose.model('FishType', fishTypeSchema);

// export fish type
module.exports = FishType;