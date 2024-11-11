const { Scenes } = require('telegraf');
const { BaseScene } = Scenes;
const ruMessage = require('../lang/ru.json');
const { yes_no } = require('../keyboards/yes_no.keyboard');
const articleService = require('../services/article.service');
const { start } = require('../keyboards/admin.keyboard');
const { back } = require('../keyboards/back.keyboard');


const AddArticleScene = new BaseScene('addArticle');

AddArticleScene.enter(async (ctx) => {
    ctx.session.step = 1;
    await ctx.reply(ruMessage.message.add_title, back());
});

AddArticleScene.on('text', async (ctx) => {
    const step = ctx.session.step;

    const userInput = ctx.message.text;
    // обработка кнопки назад
    if (userInput == ruMessage.keyboard.back[0]) {
        
        await ctx.scene.enter('backScene')
        ctx.scene.leave();
        return
    }

    switch (step) {
        case 1:
            ctx.session.title = ctx.message.text
            await ctx.reply(ruMessage.message.add_description, back())
            break;
        case 2:
            ctx.session.description = ctx.message.text
            await ctx.reply(ruMessage.message.question_photo, yes_no())
            break;
        case 3:
            if (ctx.message.text == ruMessage.keyboard.yes_no[1]) {
                try{
                    await articleService.add({
                        title: ctx.session.title,
                        description: ctx.session.description
                    })
                    await ctx.reply(ruMessage.message.save_article, start())
                } catch (error) {
                    if(error.code == 11000) {
                        await ctx.reply(ruMessage.system.double_article_error, start())
                    }else{
                        await ctx.reply(ruMessage.system.error_article, start())
                    }
                }
                ctx.scene.leave();
                break;
            } else if (ctx.message.text == ruMessage.keyboard.yes_no[0]) {
                await ctx.reply(ruMessage.message.send_photo)
                ctx.session.step = 3;
                break;
            } else {
                await ctx.reply(ruMessage.system.answer_error)
                
            }
            break;
        default:
            await ctx.reply(ruMessage.system.error_article, start());
            ctx.scene.leave();
            break;
    }
    ctx.session.step++;
    })


AddArticleScene.on('photo', async (ctx) => {
    // СДЕЛАТЬ ПРОВЕРКУ НА НАЛИЧИЕ ЗАГОЛОВКА И ОПИСАНИЯ
    if (ctx.message.photo && ctx.message.photo.length > 0) {
        ctx.session.photo = ctx.message.photo;
        const photoId = ctx.session.photo[ctx.session.photo.length - 1].file_id;
        try{
            await articleService.add({
                title: ctx.session.title,
                description: ctx.session.description,
                media: photoId
            })
            await ctx.reply(ruMessage.message.save_article, start())
        } catch (error) {
            if(error.code == 11000) {
                await ctx.reply(ruMessage.system.double_article_error, start())
            }else{
                await ctx.reply(ruMessage.system.error_article, start())
                console.log(error)
            }
        }
    } 
    ctx.scene.leave();
})

module.exports = AddArticleScene;
