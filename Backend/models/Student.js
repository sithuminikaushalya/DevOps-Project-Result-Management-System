const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    registrationNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    department: { type: String, required: true },
    semester: { type: Number, required: true },
    modules: [
        {
            name: { type: String, required: true },
            result: { type: String, required: true }
        }
    ],
    gpa: { type: Number, required: true },
    sgpa: { type: Number, required: true }
});

module.exports = mongoose.model('Student', studentSchema);
