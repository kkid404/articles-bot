const { Scenes } = require('telegraf');
const { BaseScene } = Scenes;
const ruMessage = require('../lang/ru.json');
const questionService = require('../services/question.service');
const userService = require('../services/user.service');
const { start } = require('../keyboards/start.keyboard');
const { back } = require('../keyboards/back.keyboard');
const path = require('path');


const SendQuestionScene = new BaseScene('sendQuestion');

SendQuestionScene.enter(async (ctx) => {
    ctx.session.step = 1;
    const photoPath = path.join(__dirname, '../img/1.jpg');
    await ctx.sendPhoto({ source: photoPath }, back());
});

SendQuestionScene.on('text', async (ctx) => {
    const userInput = ctx.message.text;
    const step = ctx.session.step;

    if (userInput == ruMessage.keyboard.back[0]) {
        
        await ctx.scene.enter('backScene')
        ctx.scene.leave();
        return
    }

    switch (step) {
        case 1:
            ctx.session.name = ctx.message.text
            const photoPath2 = path.join(__dirname, '../img/2.jpg');
            await ctx.sendPhoto({ source: photoPath2 }, back());
            break;
        case 2:
            ctx.session.aboutTattoo = ctx.message.text
            const photoPath3 = path.join(__dirname, '../img/3.jpg');
            await ctx.sendPhoto({ source: photoPath3 }, back());
            break;
        case 3:
            ctx.session.sazeAndPlace = ctx.message.text
            const photoPath4 = path.join(__dirname, '../img/4.jpg');
            await ctx.sendPhoto({ source: photoPath4 }, start());
            try{
                let user = await userService.getByIdUser(ctx.from.id);
                let message = `Имя: ${ctx.session.name}\nЮзернейм: @${ctx.from.username}\nО татту: ${ctx.session.aboutTattoo}\nМесто и размер: ${ctx.session.sazeAndPlace}\n `
                await questionService.add({
                    user: user,
                    name: ctx.session.name,
                    aboutTattoo: ctx.session.aboutTattoo,
                    sazeAndPlace: ctx.session.sazeAndPlace
                })
                const photoPath5 = path.join(__dirname, '../img/5.jpg');
                await ctx.telegram.sendPhoto(603694919, { source: photoPath5 })
                await ctx.telegram.sendMessage(603694919, message)
                // await ctx.sendMessage('-4530055742', message)
            } catch (error) {
                if(error.code == 11000) {
                    await ctx.reply(ruMessage.system.double_article_error, start())
                }else{
                    console.log(error)
                    await ctx.reply(ruMessage.system.error_article, start())
                }
            }
            ctx.scene.leave();
            break;
        default:
            await ctx.reply(ruMessage.system.error_article, start());
            ctx.scene.leave();
            break;
    }
    ctx.session.step++;






    // const question = ctx.message.text;
    // let user = await userService.getByIdUser(ctx.from.id);
    // try{
    //     await questionService.add({
    //         user: user,
    //         text: question
    //     })
    //     await ctx.reply(ruMessage.message.question_save)
    // } catch(error) {
    //     console.log(error)
    //     await ctx.reply(ruMessage.system.error_question, start())
    // }
    // ctx.scene.leave();
})


module.exports = SendQuestionScene;
