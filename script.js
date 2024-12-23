const app = Vue.createApp({
    data() {
        return {
            level: 'Восхождения с ночевкой',
            selectedLevel: '',
            month: 'Декабрь',
            priceInTable: '6000',
            tableData: [],
            formData: {
                date: '',
                dayOfWeek: '',
                name: '',
                price: '',
            },
        };
    },
    watch: {
        selectedLevel(newLevel) {
            this.level = newLevel;
        },
    },
    methods: {
        // Функция для добавления строки в таблицу
        addTableRow() {
            // Ваша логика обработки формы и добавления строки
            this.tableData.push({ ...this.formData }); // Используйте spread operator, чтобы создать копию объекта

            this.formData = {
                date: '',
                dayOfWeek: '',
                name: '',
                price: '',
            };
        },
        show() {
            console.log(this.tableData);
        },
        deleteFunc() {
            this.tableData.pop();
        },
        deleteAtTheStart() {
            this.tableData.shift();
        },
    },
});

app.mount('#app');
