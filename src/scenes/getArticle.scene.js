const { Scenes } = require('telegraf');
const { BaseScene } = Scenes;
const ruMessage = require('../lang/ru.json');
const articleService = require('../services/article.service');
const { articles } = require('../keyboards/articles.keyboard');
const { start } = require('../keyboards/start.keyboard');


const GetArticleScene = new BaseScene('getArticle');

GetArticleScene.enter(async (ctx) => {
    const kb = await articles()
    await ctx.reply(ruMessage.message.get_article, kb);
});

GetArticleScene.on('text', async (ctx) => {
    const userInput = ctx.message.text;

    if (userInput == ruMessage.keyboard.back[0]) {
        
        await ctx.scene.enter('backScene')
        ctx.scene.leave();
        return
    }
    
    try {
        const allArticles = await articleService.getAll();
        
        let foundArticle = null;
        for (const article of allArticles) { 
            if (userInput === article.title) {
                foundArticle = article;
            }
        }
        
        if (foundArticle) {
            if (foundArticle.media !== '') {
                // Отправка сообщения с фотографией, текстом и заголовком
                await ctx.replyWithPhoto(foundArticle.media, {
                    caption: `Заголовок: ${foundArticle.title}\nОписание: ${foundArticle.description}`, reply_markup: articles()
                });
            } else {
                await ctx.reply(`Заголовок: ${foundArticle.title}\nОписание: ${foundArticle.description}`, articles());
            }
            
        } else {
            const kb = await articles()
            await ctx.reply('Статья не найдена.', kb);
        }
    } catch (error) {
        console.error(error);
        await ctx.reply('Произошла ошибка при поиске статьи', start());
    }
})



module.exports = GetArticleScene;