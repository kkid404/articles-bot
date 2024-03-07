const ruMessage = require('..//lang/ru.json');
const { start } = require('../keyboards/admin.keyboard');
const { isAdmin } = require('../middlewares/isAdmin')
const { getChatMember } = require('telegram-bot-api');
 

module.exports = {
    command: 'admin',
    description: 'Admin command',
    action: async (ctx) => {
        const keyboard = start();
        // Получение информации о пользователе
        // const userProfilePhotos = await ctx.telegram.getUserProfilePhotos(ctx.from.id);
        const userFirstName = ctx.from.first_name;
        await ctx.reply(`${ruMessage.message.admin} ${userFirstName}`, keyboard);
    },
    middleware: isAdmin

};