const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
})

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;