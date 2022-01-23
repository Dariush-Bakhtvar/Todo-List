const Pin = document.querySelector('[data-pin]');
const sidebar = document.querySelector('.sidebar');
const wrapper = document.querySelector('.todo-wrapper');
Pin.addEventListener('click', () => {
    Pin.classList.toggle('rotate');
    sidebar.classList.toggle('active');
    wrapper.classList.toggle('slideLeft');
});