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
        return await User.findOne({ id: id })
    },

    // изменение статьи
    async updateUser(tgId, updateData) {
        return await User.findOneAndUpdate({ tg_id: tgId }, updateData, { new: true })
    },

    // удаление статьи
    async deleteUser(tgId) {
        return await User.findOneAndDelete({ tg_id: tgId })
    },

}

module.exports = ArticleService;
