const { Markup } = require('telegraf');
const ruMessage = require('../lang/ru.json');

function back() {
    return Markup.keyboard(ruMessage.keyboard.back).resize().oneTime();
}

module.exports = { back };