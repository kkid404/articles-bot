const { Markup } = require('telegraf');
const ruMessage = require('../lang/ru.json');

function start() {
    return Markup.keyboard(ruMessage.keyboard.start).resize().oneTime();
}

module.exports = { start };