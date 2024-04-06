const { isAdmin } = require('../middlewares/isAdmin')
const ruMessage = require('../lang/ru.json');

module.exports = {
    handler: (bot) => {
        bot.hears(ruMessage.keyboard.admin[3], 
            isAdmin, // Добавляем middleware здесь
            async (ctx) => {
                await ctx.scene.enter('getQuestion');
            }
        );
    }
};
