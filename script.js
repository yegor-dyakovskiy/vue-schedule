const app = Vue.createApp({
    data() {
        return {
            level: 'Восхождения с ночевкой',
            selectedLevel: '',
            month: 'Январь',
            priceInTable: '6000',
            tableData: [
                { date: '11', dayOfWeek: 'СБ', name: 'Волчья гора', price: '8000' },
                {
                    date: '12',
                    dayOfWeek: 'ВС',
                    name: 'Ледник Богдановича ',
                    price: '15000',
                },
                {
                    date: '15',
                    dayOfWeek: 'СР',
                    name: 'Ледник Богдановича',
                    price: '15000',
                },
                {
                    date: '18',
                    dayOfWeek: 'СБ',
                    name: 'Ледник Богдановича',
                    price: '15000',
                },
                { date: '18', dayOfWeek: 'СБ', name: 'Качели', price: '8000' },
                {
                    date: '19',
                    dayOfWeek: 'ВС',
                    name: 'Гора Куйгентау',
                    price: '8000',
                },
                {
                    date: '20',
                    dayOfWeek: 'ПН',
                    name: 'Ледник Богдановича',
                    price: '15000',
                },
                {
                    date: '23',
                    dayOfWeek: 'ЧТ',
                    name: 'Ледник Богдановича',
                    price: '15000',
                },
                {
                    date: '25',
                    dayOfWeek: 'СБ',
                    name: 'Бутаковский водопад',
                    price: '8000',
                },
                {
                    date: '25',
                    dayOfWeek: 'СБ',
                    name: 'Кольцо Ким Асара',
                    price: '8000',
                },
                {
                    date: '26',
                    dayOfWeek: 'ВС',
                    name: 'Ледник Богдановича',
                    price: '15000',
                },
            ],
            formData: {
                inputText: '', // Для расписания
                price: '', // Для цены
            },
        };
    },
    methods: {
        // Функция для отправки данных на сервер
        async handleFormSubmit() {
            try {
                // Подготовка данных для отправки
                const payload = {
                    inputText: this.formData.inputText,
                    price: this.formData.price,
                };

                // Логирование отправляемых данных
                console.log('Отправляемые данные на сервер:', payload);

                // Отправка данных на сервер
                const response = await fetch('http://localhost:3000/save-schedule', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                // Проверка ответа от сервера
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
                }

                // Получаем данные от сервера, если они есть
                const data = await response.json();

                // Обновляем tableData с полученными данными для рендеринга
                this.tableData = data.scheduleData;

                // Очищаем форму
                this.formData.inputText = '';
                this.formData.price = '';
                console.log('Данные успешно отправлены и получены:', data);
            } catch (error) {
                console.error('Ошибка при отправке данных:', error);
            }
        },

        // Функция для захвата изображений
        captureAsImage(elementType) {
            const captureElement = document.getElementById(`element-to-capture-${elementType}`);

            // Если элемент не найден, выходим из функции
            if (!captureElement) {
                console.error('Элемент для захвата не найден');
                return;
            }

            html2canvas(captureElement, {
                scale: 2, // Для увеличения разрешения
                logging: true, // Логирование, чтобы отслеживать проблему
                useCORS: true, // Разрешение кросс-оригинальных запросов
            })
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png'); // Генерируем Base64 PNG

                    // Создаём ссылку для скачивания
                    const link = document.createElement('a');
                    link.href = imgData;
                    link.download = `screenshot-${elementType}.png`; // Имя файла для сохранения
                    document.body.appendChild(link); // Добавляем ссылку в документ
                    link.click(); // Автоматический клик для скачивания
                    document.body.removeChild(link); // Удаляем ссылку после скачивания

                    console.log('Изображение успешно сохранено!');
                })
                .catch((error) => {
                    console.error('Ошибка при рендеринге с помощью html2canvas:', error);
                });
        },

        async firtsFetch() {
            try {
                const response = await fetch('http://localhost:3000/');

                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
                }

                // Выводим заголовки ответа
                console.log('Заголовки ответа:', response.headers);

                // Получаем текстовый ответ
                const data = await response.text();
                console.log('Ответ от сервера:', data);
            } catch (error) {
                console.error('Ошибка при запросе:', error);
            }
        },
    },
});

app.mount('#app');
