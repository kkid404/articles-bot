const { Markup } = require('telegraf');
const ruMessage = require('../lang/ru.json');

function yes_no() {
    return Markup.keyboard(ruMessage.keyboard.yes_no).resize().oneTime();
}

module.exports = { yes_no };