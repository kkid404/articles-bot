const ruMessage = require('../lang/ru.json');


module.exports = {
    handler: (bot) => {
        bot.hears(ruMessage.keyboard.start[1] , async (ctx) =>{
            await ctx.scene.enter('sendQuestion')
        } 
        )
    }
}

