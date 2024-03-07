const { Telegraf, Scenes } = require('telegraf');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const ruMessage = require('./lang/ru.json');
const connectToMongo = require('./models/db');
const LocalSession = require('telegraf-session-local');

const botToken = process.env.TELEGRAM_BOT_TOKEN;

if (!botToken) {
  console.error(ruMessage.system.error_token);
  process.exit(1);
}

connectToMongo();
const bot = new Telegraf(botToken);

const { Stage } = Scenes;

// Использование локальной сессии
const localSession = new LocalSession({ database: 'session_db.json' });
bot.use(localSession.middleware());

// Подготовка Stage для сцен
const stage = new Stage();
bot.use(stage.middleware());


// Регистрация сцен
const scenesPath = path.join(__dirname, 'scenes');
fs.readdirSync(scenesPath).forEach(file => {
  if (file.endsWith('.js')) {
    const scene = require(`./scenes/${file}`);
    stage.register(scene);
  }
});

// Регистрация команд
const commandsFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));
commandsFiles.forEach(file => {
  const command = require(`./commands/${file}`);
  if (command.middleware) {
    bot.command(command.command, command.middleware, command.action);
  } else {
    bot.command(command.command, command.action);
  }
});

// Регистрация обработчиков
const handlersPath = path.join(__dirname, 'handlers');
fs.readdirSync(handlersPath).forEach(file => {
  if (file.endsWith('.js')) {
    const { handler } = require(`./handlers/${file}`);
    handler(bot);
  }
});

// Запуск бота
bot.launch();
console.log(ruMessage.system.start);