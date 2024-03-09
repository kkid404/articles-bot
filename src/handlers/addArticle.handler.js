const { isAdmin } = require('../middlewares/isAdmin')
const ruMessage = require('../lang/ru.json');


module.exports = {
    middleware: isAdmin,
    handler: (bot) => {
        bot.hears(ruMessage.keyboard.admin[0] , async (ctx) =>{
            await ctx.scene.enter('addArticle')
        } 
        )
    }
}

