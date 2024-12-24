import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;

app.use(express.json()); // Для парсинга JSON в теле запроса
app.use(cors()); // Для включения CORS

// Путь к файлу для записи (исправляем путь)
const dataFilePath = path.join(__dirname, 'scheduleData.json');
console.log(dataFilePath);
// Маршрут для обработки GET-запроса (проверка работоспособности сервера)
app.get('/', (req, res) => {
    res.status(200).send('Hello, this is a response from the server!');
});

// Один маршрут для обработки POST-запроса /save-schedule
app.post('/save-schedule', (req, res) => {
    const { inputText, price } = req.body; // Получаем данные из запроса

    // Логирование полученных данных
    console.log('Полученные данные:', { inputText, price });

    // Разбиваем inputText на строки
    const lines = inputText.trim().split('\n');

    // Преобразуем каждую строку в объект
    const scheduleData = lines.map((line) => {
        // Разделяем строку на части: дату, день недели и название
        const [date, dayOfWeek, ...nameParts] = line.split(' ');

        // Собираем название из оставшихся частей
        const name = nameParts.join(' ');

        // Возвращаем объект с полями date, dayOfWeek, name и price
        return {
            date,
            dayOfWeek,
            name,
            price,
        };
    });

    // Логируем полученный массив
    console.log('Массив расписания:', scheduleData);

    // Отправляем успешный ответ с данными
    res.status(200).json({
        message: 'Данные успешно получены и обработаны',
        scheduleData, // Отправляем массив обратно на фронт
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
