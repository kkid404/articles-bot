const { Scenes } = require('telegraf');
const { BaseScene } = Scenes;
const ruMessage = require('../lang/ru.json');
const articleService = require('../services/article.service');
const { articles } = require('../keyboards/articles.keyboard');
const { start } = require('../keyboards/start.keyboard');


const GetArticleScene = new BaseScene('getArticle');

GetArticleScene.enter(async (ctx) => {
    const keyboard = await articles();
    await ctx.reply(ruMessage.message.get_article, keyboard);
});

GetArticleScene.on('text', async (ctx) => {
    const userInput = ctx.message.text;
    // обработка кнопки назад
    if (userInput == ruMessage.keyboard.back[0]) {
        
        await ctx.scene.enter('backScene')
        ctx.scene.leave();
        return
    }
    
    try {
        // поиск статьи по заголовку
        const allArticles = await articleService.getAll();
        let foundArticle = null;
        for (const article of allArticles) { 
            if (userInput === article.title) {
                foundArticle = article;
            }
        }
        
        if (foundArticle) {
            if (foundArticle.media !== '') {
                // Отправка статьи с фотографией
                await ctx.replyWithPhoto(foundArticle.media, {
                    caption: `${foundArticle.title}\n\n${foundArticle.description}`, reply_markup: articles()
                });
            } else {
                // Отправка статьи без фото
                await ctx.reply(`${foundArticle.title}\n\n${foundArticle.description}`, articles());
            }
            
        } else {
            await ctx.reply(ruMessage.system.article_not_found, articles());
        }
    } catch (error) {
        console.error(error);
        await ctx.reply(ruMessage.system.article_error, start());
        ctx.scene.leave();
        return
    }
})



module.exports = GetArticleScene;