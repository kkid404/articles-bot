const Article = require('../models/article.model')

const ArticleService = {
    
    // добавление статьи
    async add(articleData) {
        const article = new Article(articleData)
        await article.save()
        return article;
    },

    // получение статьи по id
    async getById(id) {
        return await Article.findOne({ _id: id })
    },

    async getAll() {
        return await Article.find({});
    },

    // изменение статьи
    async update(id, updateData) {
        return await Article.findOneAndUpdate({ _id: id }, updateData, { new: true })
    },

    // удаление статьи
    async delete(id) {
        return await Article.findOneAndDelete({ _id: id })
    },

}

module.exports = ArticleService;
