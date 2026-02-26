const mongoose = require('mongoose');


// name, email, password, phone, city, question1, question2

const advocateSchema = new mongoose.Schema({
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
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    city: {
        type: String,
        default: ''
    },
    question1: {
        type: String,
        required: true,
    },
    question2: {
        type: String,
        required: true,
    }

});

advocateSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

advocateSchema.set('toJSON', {
    virtuals: true,
});

exports.Advocate = mongoose.model('Advocate', advocateSchema);
exports.advocateSchema = advocateSchema;
