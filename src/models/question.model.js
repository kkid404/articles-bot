const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    aboutTattoo: { type: String, required: true },
    sazeAndPlace : { type: String, required: true },
})

const Question = mongoose.model('Lead', questionSchema);
module.exports = Question;