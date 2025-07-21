const mongoose = require('mongoose');

const homepageslider = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a title"],
        trim: true,
        minlength: [3, "Title must be at least 3 characters"],
        maxlength: [100, "Title must be less than 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        minlength: [2, "Description must be at least 20 characters"],
        maxlength: [5000, "Description must be less than 5000 characters"]
    },
    image: {
        type: String,
        required: [true, "Please add an image "]
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
    });

module.exports = mongoose.model('Homepageslider', homepageslider);