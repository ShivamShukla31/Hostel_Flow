import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },

    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email address"]
},

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    role: {
        type: String,
        enum: ['Student', 'Rector', 'Worker'],
        default: 'Student'
    },

    hostel: {
        type: String,
        default: null
    },

    mobile: {
        type: String,
        match: /^[0-9]{10}$/,
        default: null
    },

    profilePicture: {
        type: String,
        default: null
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true });

export default mongoose.model("User", userSchema);