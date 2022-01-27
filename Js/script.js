const Pin = document.querySelector('[data-pin]');
const modalTask = document.querySelector('[data-modalTask]');
const textarea = document.querySelectorAll('.add-task textarea');
const createTask = document.querySelector('[data-createTask]');
const toDoWapper = document.querySelector('.task-wrapper');
const taskList = document.querySelector('.tasklist a');
const subList = document.querySelector('.sublist');
Pin.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    const wrapper = document.querySelector('.task-wrapper');
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
taskList.addEventListener('click', () => {
    const arrow = document.querySelector('.arrow');
    subList.classList.toggle('active');
    arrow.classList.toggle('rotate');
});