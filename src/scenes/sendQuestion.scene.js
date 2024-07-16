const { Scenes } = require('telegraf');
const { BaseScene } = Scenes;
const ruMessage = require('../lang/ru.json');
const questionService = require('../services/question.service');
const userService = require('../services/user.service');
const { start } = require('../keyboards/start.keyboard');
const { back } = require('../keyboards/back.keyboard');



const SendQuestionScene = new BaseScene('sendQuestion');

SendQuestionScene.enter(async (ctx) => {
    await ctx.reply(ruMessage.message.send_question, back());
});

SendQuestionScene.on('text', async (ctx) => {
    const userInput = ctx.message.text;

    if (userInput == ruMessage.keyboard.back[0]) {
        
        await ctx.scene.enter('backScene')
        ctx.scene.leave();
        return
    }


    const question = ctx.message.text;
    let user = await userService.getByIdUser(ctx.from.id);
    try{
        await questionService.add({
            user: user,
            text: question
        })
        await ctx.reply(ruMessage.message.question_save)
    } catch(error) {
        console.log(error)
        await ctx.reply(ruMessage.system.error_question, start())
    }
    ctx.scene.leave();
})


module.exports = SendQuestionScene;
