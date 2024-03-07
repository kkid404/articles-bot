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
        return await Article.findOne({ id: id })
    },

    // изменение статьи
    async update(id, updateData) {
        return await Article.findOneAndUpdate({ id: id }, updateData, { new: true })
    },

    // удаление статьи
    async delete(id) {
        return await Article.findOneAndDelete({ id: id })
    },

}

module.exports = ArticleService;
