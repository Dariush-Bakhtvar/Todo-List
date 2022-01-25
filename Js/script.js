const Pin = document.querySelector('[data-pin]');
const sidebar = document.querySelector('.sidebar');
const wrapper = document.querySelector('.todo-wrapper');
const textarea = document.querySelectorAll('.add-task textarea');
const createTask = document.querySelector('[data-createTask]');
const modalTask = document.querySelector('[data-modalTask]');
const toDoWapper = document.querySelector('.todo-wrapper');
Pin.addEventListener('click', () => {
    Pin.classList.toggle('rotate');
    sidebar.classList.toggle('active');
    wrapper.classList.toggle('slideLeft');
});
textarea.forEach(item => {
    item.addEventListener('input', () => {
        item.style.height = `auto`;
        item.style.height = `${item.scrollHeight}px`;
    });
});
createTask.addEventListener('click', () => {
    modalTask.classList.add('activeModal');
});
toDoWapper.addEventListener('click', () => {
    modalTask.classList.remove('activeModal');
});