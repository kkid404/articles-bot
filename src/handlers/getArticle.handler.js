const ruMessage = require('../lang/ru.json');


module.exports = {
    handler: (bot) => {
        bot.hears(ruMessage.keyboard.start[0] , async (ctx) =>{
            await ctx.scene.enter('getArticle')
        } 
        )
    }
}

