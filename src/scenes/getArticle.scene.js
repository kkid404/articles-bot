const { Scenes } = require('telegraf');
const { BaseScene } = Scenes;
const ruMessage = require('../lang/ru.json');
const articleService = require('../services/article.service');
const { articles } = require('../keyboards/articles.keyboard');
const { start } = require('../keyboards/start.keyboard');

// перенести в utils
function splitText(text, maxLength) {
    const parts = [];
    let startIndex = 0;

    while (startIndex < text.length) {
        let endIndex = Math.min(startIndex + maxLength, text.length);

        // Найти последний пробел до максимального индекса, чтобы не разрывать слова
        if (endIndex < text.length) {
            const lastSpaceIndex = text.lastIndexOf(' ', endIndex);
            if (lastSpaceIndex > startIndex) {
                endIndex = lastSpaceIndex;
            }
        }

        // Добавляем часть текста в массив
        parts.push(text.slice(startIndex, endIndex).trim());
        startIndex = endIndex + 1;  // Переходим на следующий символ после пробела
    }

    return parts;
}


const GetArticleScene = new BaseScene('getArticle');

GetArticleScene.enter(async (ctx) => {
    const keyboard = await articles();
    await ctx.reply(ruMessage.message.get_article, keyboard);
});

GetArticleScene.on('text', async (ctx) => {
    const userInput = ctx.message.text;
    // обработка кнопки назад
    if (userInput == ruMessage.keyboard.back[0]) {
        await ctx.scene.enter('backScene');
        ctx.scene.leave();
        return;
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
                const caption = `${foundArticle.title}\n\n${foundArticle.description}`;
                

                const photoParts = splitText(caption, 1024);
                const messageParts = splitText(caption.slice(photoParts[0].length).trim(), 4000);

                // Отправка статьи с фотографией
                try {
                    await ctx.replyWithPhoto(foundArticle.media[0], {
                        caption: photoParts[0], reply_markup: await articles()
                    });

                    if (messageParts && messageParts.length > 0) {
                        for (const part of messageParts) {
                            await ctx.reply(part, await articles());
                        }
                    }
                } catch (error) {
                    console.error('Ошибка при отправке фото:', error);
                    await ctx.reply(ruMessage.system.article_error, start());
                }
            } else {
                // Отправка статьи без фото
                await ctx.reply(`${foundArticle.title}\n\n${foundArticle.description}`, await articles());
            }
            
        } else {
            await ctx.reply(ruMessage.system.article_not_found, await articles());
        }
    } catch (error) {
        console.error(error);
        await ctx.reply(ruMessage.system.article_error, await start());
        ctx.scene.leave();
        return;
    }
});

module.exports = GetArticleScene;
