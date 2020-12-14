const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        unique: 'Name must be unique',
        trim: true
    },
    type: {
        type: String,
        required: 'Type is required',
        trim: true
    },
    count: {
        type: Number,
        required: 'Count is required'
    },
    status: {
        type: Boolean,
        default: false
    }
});

assetSchema.post('save', async function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next({ message: 'Name must be unique'});
    } else {
      next(error);
    }
});
    
const Asset = mongoose.model('Asset', assetSchema);

module.exports = Asset;