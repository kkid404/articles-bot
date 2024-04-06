const { Markup } = require('telegraf');
const QuestionService = require('../services/question.service');
const ruMessage = require('../lang/ru.json');

async function questions() {
    const question = await QuestionService.getAll();
    const uniqueTitles = [...new Set(question.map(question => question.text))];
    uniqueTitles.push(ruMessage.keyboard.back[0]);
    return Markup.keyboard(uniqueTitles).resize().oneTime();
}

module.exports = { questions };