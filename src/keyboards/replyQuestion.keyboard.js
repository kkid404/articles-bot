const { Markup } = require('telegraf');
const ruMessage = require('../lang/ru.json');

function replyQuestion() {
  const inlineKeyboard = Object.entries(ruMessage.keyboard.question_back).map(([callbackData, buttonText]) => {
    return Markup.button.callback(buttonText, callbackData);
  });

  return Markup.inlineKeyboard(inlineKeyboard);
}

module.exports = { replyQuestion };