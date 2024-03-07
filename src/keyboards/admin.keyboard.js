const { Markup } = require('telegraf');
const ruMessage = require('../lang/ru.json');

function start() {
    return Markup.keyboard(ruMessage.keyboard.admin).resize().oneTime();
}

module.exports = { start };