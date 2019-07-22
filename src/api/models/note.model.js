const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    name: String,
    phoneno: String,
    area:String,
    city:String,
    pincode:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);