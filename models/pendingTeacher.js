const mongoose = require("mongoose");

const pendingTeacherSchema = new mongoose.Schema({
    name: String,
    uniqueId: String,
    email: String,
    password: String,
    phone: Number,
    institute: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("PendingTeacher", pendingTeacherSchema);
