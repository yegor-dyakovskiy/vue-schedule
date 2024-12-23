import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Определяем текущую директорию файла
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для парсинга расписания
function parseSchedule(inputText, price) {
    // Разбиваем текст по строкам
    const lines = inputText.trim().split('\n');

    // Преобразуем строки в массив объектов
    const tableData = lines.map((line) => {
        // Разбиваем строку на части
        const [date, dayOfWeek, ...nameParts] = line.split(' ');

        // Собираем название обратно (если оно состоит из нескольких слов)
        const name = nameParts.join(' ');

        // Возвращаем объект с данными
        return {
            date,
            dayOfWeek,
            name,
            price,
        };
    });

    return tableData;
}

// Функция для сохранения данных в файл как JavaScript-код
function saveAsCode(filename, data) {
    // Формируем JavaScript-код без кавычек вокруг ключей
    const jsCode = `const tableData = [
${data
    .map(
        (obj) => `  {
    date: "${obj.date}",
    dayOfWeek: "${obj.dayOfWeek}",
    name: "${obj.name}",
    price: "${obj.price}"
  }`
    )
    .join(',\n')},
];`;

    // Определяем абсолютный путь для записи файла
    const filePath = path.join(__dirname, filename);

    // Записываем в файл
    fs.writeFileSync(filePath, jsCode, 'utf-8');
    console.log(`Данные успешно записаны в файл: ${filePath}`);
}

// Пример использования
const inputText = `
7 сб Гора Серкебай
8 вс Девичьи Слёзы
9 пн Тропы Ким-Асара
15 вс Хребет Каракунгей
16 пн Гора Серкебай 
21 сб Водопад Желаний 
22 вс Девичьи слёзы
29 вс Солнечная поляна
30 пн Ким-Асар Алтыбакан 
31 вт Гора Серкебай
`;

const price = '6000'; // Цена
const result = parseSchedule(inputText, price);

// Сохраняем результат как JavaScript-код
saveAsCode('tableData.js', result);
