const { Scenes } = require('telegraf');
const { BaseScene } = Scenes;
const ruMessage = require('../lang/ru.json');
const QuestionService = require('../services/question.service');

const { questions } = require('../keyboards/questions.keyboard');
const { replyQuestion } = require('../keyboards/replyQuestion.keyboard');
const { start } = require('../keyboards/start.keyboard');


const GetQuestionScene = new BaseScene('getQuestion');

GetQuestionScene.enter(async (ctx) => {
    const kb = await questions()
    await ctx.reply(ruMessage.message.question_get, kb);
});

GetQuestionScene.on('text', async (ctx) => {
    const userInput = ctx.message.text;

    if (userInput == ruMessage.keyboard.back[0]) {
        
        await ctx.scene.enter('backScene')
        ctx.scene.leave();
        return
    }
    
    try {
        const allQuestion = await QuestionService.getAll();
        
        let foundQuestion = null;
        for (const question of allQuestion) { 
            if (userInput === question.text) {
                foundQuestion = question;
            }
        }
        
        if (foundQuestion) {
            await ctx.reply(`${foundQuestion.text}`, replyQuestion());

            ctx.session.questionUserId = foundQuestion.user
            ctx.session.questionId = foundQuestion._id


            
        } else {
            await ctx.reply(ruMessage.system.question_not_found, articles());
        }
    } catch (error) {
        console.error(error);
        await ctx.reply(ruMessage.system.question_error, start());
        ctx.scene.leave();
        return
    }
})

GetQuestionScene.action(Object.keys(ruMessage.keyboard.question_back), async (ctx) => {
    const action = ctx.callbackQuery.data;
    if (action === Object.keys(ruMessage.keyboard.question_back)[0]) {
        await ctx.scene.enter('replyQuestionScene');
        return
    } else {
        await ctx.scene.enter('backScene');
        ctx.scene.leave();
        return
    }
    
});

module.exports = GetQuestionScene;