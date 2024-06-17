const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lecturerSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String, required: true }
});

module.exports = mongoose.model('Lecturer', lecturerSchema);
