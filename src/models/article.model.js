const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    media: [{ type: String }] // Изменено на массив строк
})

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;