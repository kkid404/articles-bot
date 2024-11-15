const { isAdmin } = require('../middlewares/isAdmin')
const ruMessage = require('../lang/ru.json');

module.exports = {
    handler: (bot) => {
        bot.hears(ruMessage.keyboard.admin[4], 
            isAdmin, // Добавляем middleware здесь
            async (ctx) => {
                await ctx.scene.enter('exportArticles');
            }
        );
    }
};