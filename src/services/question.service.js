const QuestionModel = require('../models/question.model')

const QuestionService = {
    
    // добавление вопроса
    async add(QuestionData) {
        const Question = new QuestionModel(QuestionData)
        await Question.save()
        return Question;
    },

    // получение вопроса по id
    async getById(id) {
        return await QuestionModel.findOne({ id: id })
    },

    // получить все вопросы
    async getAll() {
        return await QuestionModel.find({});
    },


    // удаление вопроса
    async delete(id) {
        return await QuestionModel.findOneAndDelete({ _id: id })
    },

}

module.exports = QuestionService;
