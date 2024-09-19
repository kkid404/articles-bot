const ruMessage = require('../lang/ru.json');
const { start } = require('../keyboards/start.keyboard');
const userService = require('../services/user.service');
const path = require('path');

module.exports = {
    command: 'start',
    description: 'Start command',
    action: async (ctx) => {
        const tgId = ctx.from.id

        // проверка на наличие юзера в базе данных
        let user = await userService.getByIdUser(tgId);
        
        if(!user) {
            user = await userService.addUSer({
                tg_id: tgId,
                name: ctx.from.first_name || '',
                lastname: ctx.from.last_name  || '',
                username: ctx.from.username  || '',
                role: 'user',
            })
        }

        const photoPath6 = path.join(__dirname, '../img/6.jpg');
        await ctx.sendPhoto({ source: photoPath6 },{ caption: ruMessage.message.start})
    },
};