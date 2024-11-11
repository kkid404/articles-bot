// Подключение необходимых модулей: Mongoose для работы с MongoDB и dotenv для загрузки переменных окружения
const mongoose = require('mongoose');
require('dotenv').config();

// Функция для подключения к MongoDB
function connectToMongo() {
  // Получение настроек подключения из переменных окружения или использование значений по умолчанию
  const login = process.env.DB_LOGIN
  const password = encodeURIComponent(process.env.DB_PASSWORD)
  const host = process.env.DB_HOST || 'localhost'; // Хост базы данных, по умолчанию 'localhost'
  const port = process.env.DB_PORT || 27017;       // Порт, на котором работает MongoDB, по умолчанию 27017
  const data = process.env.DB_NAME || 'mydatabase'; // Имя базы данных, по умолчанию 'mydatabase'

  // Формирование строки подключения к MongoDB
  const mongoURI = `mongodb://${login}:${password}@${host}:${port}/${data}`;

  // Подключение к MongoDB с использованием строки подключения и настроек
  mongoose.connect(mongoURI, {
    directConnection: true
  }).then(() => {
    // Логирование успешного подключения
    console.log('Connected to MongoDB');
  }).catch(err => {
    // Обработка ошибок подключения
    console.error('Could not connect to MongoDB:', err.message);
  });

  // Получение объекта подключения к базе данных
  const db = mongoose.connection;
  // Обработка ошибок после установления подключения
  db.on('error', console.error.bind(console, 'connection error:'));
}

// Экспорт функции connectToMongo для использования в других частях приложения
module.exports = connectToMongo;