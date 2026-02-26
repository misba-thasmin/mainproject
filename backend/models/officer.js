const mongoose = require('mongoose');


// name, email, password, phone, city.

const officerSchema = new mongoose.Schema({
  
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: true,
    },
    // department: {
    //     type: String,
    //     default: true,
    // },
    dateCreated: {
        type: Date,
        default: Date.now
    },
});

officerSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

officerSchema.set('toJSON', {
    virtuals: true,
});

exports.Officer = mongoose.model('Officer', officerSchema);
exports.officerSchema = officerSchema;
