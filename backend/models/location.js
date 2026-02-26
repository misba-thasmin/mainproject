const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
    
    
    adminemail: {
        type: String,
        required: true,    
    },
    location: {
        type: String,
        required: true,    
    },
    
    dateCreated: {
        type: Date,
        default: Date.now
    },
})


locationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

locationSchema.set('toJSON', {
    virtuals: true,
});


exports.Location = mongoose.model('Location', locationSchema);
