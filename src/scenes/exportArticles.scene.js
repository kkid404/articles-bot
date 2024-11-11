const { Scenes } = require('telegraf');
const { BaseScene } = Scenes;
const fs = require('fs');
const path = require('path');
const articleService = require('../services/article.service');

const ExportArticlesScene = new BaseScene('exportArticles');

ExportArticlesScene.enter(async (ctx) => {
    await ctx.reply('Загрузка всех статей...');

    try {
        const articles = await articleService.getAll();

        if (articles.length === 0) {
            await ctx.reply('Статьи не найдены.');
            return ctx.scene.leave();
        }

        // Создаем временную директорию для файлов
        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

        // Создаем текстовый файл для каждой статьи
        const files = [];
        for (const article of articles) {
            const filePath = path.join(tempDir, `${article.title}.txt`);
            const content = `${article.title}\n\n${article.description}`;
            fs.writeFileSync(filePath, content);
            files.push(filePath);
        }

        // Отправляем файлы пользователю
        for (const file of files) {
            await ctx.replyWithDocument({ source: file });
        }

        // Удаляем временные файлы
        files.forEach(file => fs.unlinkSync(file));
    } catch (error) {
        console.error('Ошибка при обработке статей:', error);
        await ctx.reply('Произошла ошибка при загрузке статей.');
    }

    ctx.scene.leave();
});

module.exports = ExportArticlesScene;
