const { Markup } = require('telegraf');
const articleService = require('../services/article.service');
const ruMessage = require('../lang/ru.json');

async function articles() {
    const articles = await articleService.getAll();
    let uniqueTitles = [];
    if (articles.length > 0) {
        uniqueTitles = [...new Set(articles.map(article => article.title))];
    }
    uniqueTitles.push(ruMessage.keyboard.back[0]);

    return Markup.keyboard(uniqueTitles.map(title => [Markup.button.text(title)])).resize().oneTime();
}

module.exports = { articles };