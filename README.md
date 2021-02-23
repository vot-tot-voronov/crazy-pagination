# Тестовое задание от компании Crazy Panda (Pagination)

## Описание приложения
Задание выполнено на ReactJS. Пагинация осуществляется при нажатии на номер соответствующей страницы.
Далле происходит GET-запрос к сервису JSONPlaceholder, в параметрах которого мы указываем лимит на количество элементов получаемых за раз и номер страницы. Кнопки пагинации расположены как внизу страницы, так и вверху.
Сортировка элементов происходит при нажатии на столбец 'Number of photo' (см. функцию `handleSort()`)
Фильтрацию элементов осуществляет функция `handleSearch()`.
Управление состоянием компонента происходит при помощи хука `useReducer()`.
Для визуальной части используется библиотека `Bootstrap` в связке с `react-bootstrap`, но если понадобится внести свои стили, то рефакторинг компонента будет совсем небольшим.

## Запуск приложения
### Локально:
1. Скачайте файлы из репозитория;
2. Выполните команду npm install, затем npm/yarn start.
### Через github-pages
[Ссылка на проект](<https://vot-tot-voronov.github.io/crazy-pagination/#/>)