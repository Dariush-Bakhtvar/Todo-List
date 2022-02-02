const Pin = document.querySelector('[data-pin]');
const modalTask = document.querySelector('[data-modalTask]');
const textarea = document.querySelectorAll('.add-task textarea');
const createTask = document.querySelector('[data-createTask]');
const toDoWapper = document.querySelector('.task-wrapper');
const taskList = document.querySelector('.tasklist a');
const subList = document.querySelector('.sublist');
const accord = document.querySelector('[data-accordion]');
const addTaskBtn = document.querySelector('[data-addTask]');
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
accord.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    const nextSibl = target.nextElementSibling;
    target.children[1].classList.toggle('rotate');
    if (nextSibl.style.maxHeight) nextSibl.style.maxHeight = null;
    else nextSibl.style.maxHeight = `${nextSibl.scrollHeight}px`;

});
//add event to btn addtask 
addTaskBtn.addEventListener('click', addNewTask);

function addNewTask() {
    const textArea = document.querySelectorAll('.add-task textarea');
    const addSelectTask = document.getElementById('selecet__addtask');
    const li = document.createElement('li');
    li.innerHTML = ` <div class="task-item">
                            <input type="checkbox" name="checktask" id="task1">
                            <p>${textArea[0].value} </p>
                            <p>${textArea[1].value}</p>
                        </div>
                        <div class="task-control">
                            <span><i class="fal fa-pen"></i></span>
                            <span><i class="fal fa-trash"></i></span>
                        </div>`;
    switch (addSelectTask.value) {
        case 'import':
            const addImport = document.querySelector('[data-import]');
            addImport.appendChild(li);
            break;
        case 'personal':
            const addPerson = document.querySelector('[data-personal]');
            li.innerHTML = ` <div class="task-item">
                            <input type="checkbox" name="checktask" id="task1">
                            <p>${textArea[0].value} </p>
                            <p>${textArea[1].value}</p>
                        </div>
                        <div class="task-control">
                            <span><i class="fal fa-pen"></i></span>
                            <span><i class="fal fa-trash"></i></span>
                        </div>`;
            addPerson.appendChild(li);
            break;
        case 'work':
            const addWork = document.querySelector('[data-work]');
            addWork.appendChild(li);
            break;
        case 'sport':
            const addSprot = document.querySelector('[data-sport]');
            addSprot.appendChild(li);
            break;
        case 'course':
            const addCourse = document.querySelector('[data-course]');
            addCourse.appendChild(li);
            break;
    }

}