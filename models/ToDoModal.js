const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""  // Default value if description is missing
    }
});

module.exports = mongoose.model('ToDo', todoSchema);
