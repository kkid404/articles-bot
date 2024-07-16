const { Scenes } = require('telegraf');
const { BaseScene } = Scenes;
const ruMessage = require('../lang/ru.json');
const QuestionService = require('../services/question.service');
const UserService = require('../services/user.service');

const { start } = require('../keyboards/start.keyboard');

const replyQuestionScene = new BaseScene('replyQuestionScene');

replyQuestionScene.enter(async (ctx) => {
    await ctx.reply(ruMessage.message.question_reply);
});

replyQuestionScene.on('text', async (ctx) => {

    const tgQuestionUserId = await UserService.getById(ctx.session.questionUserId)

    const answer = ctx.message.text;

    console.log(ctx.session.questionId)

    const kb = await start();
    try {
        await ctx.telegram.sendMessage(tgQuestionUserId.tg_id, answer);
        await ctx.reply(ruMessage.message.reply_send, kb);
        await QuestionService.delete(ctx.session.questionId);
    } catch (e) {
        console.log(e);
    }

    ctx.scene.leave();
});

module.exports = replyQuestionScene;
