const mongoose = require("mongoose");

const pendingStudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    uniqueId: String,
    phone: Number,
    password: String,
    institute: String,
    approval: {
        type: String,
        default: "pending"
    }
});

module.exports = mongoose.model("PendingStudent", pendingStudentSchema);
