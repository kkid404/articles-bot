const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    tg_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    lastname: { type: String, default: '' },
    username: { type: String, default: '' },
    role: { type: String, default: 'user' },
})

const User = mongoose.model('User', userSchema);
module.exports = User;