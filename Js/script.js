const Pin = document.querySelector('[data-pin]');
const modalTask = document.querySelector('[data-modalTask]');
const modalEdit = document.querySelector('[data-modalEdit]');
const textarea = document.querySelectorAll('.add-task textarea');
const createTask = document.querySelector('[data-createTask]');
const closeModal = document.querySelectorAll('.close');
const taskList = document.querySelector('.tasklist a');
const subList = document.querySelector('.sublist');
const accord = document.querySelector('[data-accordion]');
const addTaskBtn = document.querySelector('[data-addTask]');
const editTaskBtn = document.querySelector('[data-editTask]');
const manageTasks = document.querySelector('.task__list');
const filterTasks = document.querySelector('#selected_import');

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

function close() {
    modalTask.classList.remove('activeModal');
    modalEdit.classList.remove('activeModal');
}
closeModal.forEach(item => {
    item.addEventListener('click', close);
});
taskList.addEventListener('click', () => {
    const arrow = document.querySelector('.arrow');
    subList.classList.toggle('active');
    arrow.classList.toggle('rotate');
});

function slidAcoord(e) {
    const target = e.target.closest('a');
    const nextSibl = target.nextElementSibling;
    target.children[1].classList.toggle('rotate');
    if (nextSibl.style.maxHeight) nextSibl.style.maxHeight = null;
    else nextSibl.style.maxHeight = `${nextSibl.scrollHeight}px`;
}
//add event to btn addtask 
function addNewTask() {
    const textArea = document.querySelectorAll('.add-task textarea');
    if (textArea[0].value == '' || textArea[1].value == '') return;
    const addSelectTask = document.getElementById('selecet__addtask');
    const li = document.createElement('li');
    li.innerHTML = ` <div class="task-item">
                            <span><i class="far fa-check"></i></span>
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
    textArea.forEach(item => {
        item.value = '';
    });
}
// manage add Tasks ===> edit * remove * checked compelete
function manageTask(e) {
    const modalEdit = document.querySelector('[data-modalEdit]');
    const clastList = [...e.target.classList]; //* select target class name for delete edit complete
    switch (clastList[1]) {
        case 'fa-check':
            const parent = e.target.closest('li'); //get parent element
            const titleTask = e.target.parentElement.nextElementSibling; // get next element(p) as title
            const check = e.target;
            titleTask.classList.toggle('compelete_check');
            check.classList.toggle('check_icon');
            parent.toggleAttribute('data-compelete');
            break;
        case 'fa-pen':
            let child = [...e.target.closest('li').firstElementChild.children]; //* select previous div(.task-item)
            modalEdit.classList.add('activeModal');
            const textArea = document.querySelectorAll('.edit-tasks textarea');
            editTaskBtn.addEventListener('click', () => {
                if (textArea[0].value == '' || textArea[1].value == '') return;
                child[1].innerHTML = textArea[0].value;
                child[2].innerHTML = textArea[1].value;
                console.log(child, child.filter(item => item != 'p'));
            });

            console.log(child);


            break;
        case 'fa-trash':
            const li = e.target.parentElement.parentElement.parentElement;
            li.remove();
            break;
    }
}
// filter task by catgory ==> all/comeleted/uncompeleted
function filterTask(e) {
    const task = document.querySelectorAll('.task__list li');
    switch (e.target.value) {
        case 'all':
            task.forEach(item => item.style.display = 'flex');
            break;
        case 'uncompeleted':
            task.forEach(item => {
                if (!item.hasAttribute('data-compelete')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
            break;
        case 'complated':
            task.forEach(item => {
                if (item.hasAttribute('data-compelete')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
            break;
    }

}
accord.addEventListener('click', slidAcoord);
filterTasks.addEventListener('click', filterTasks);
addTaskBtn.addEventListener('click', addNewTask);
manageTasks.addEventListener('click', manageTask);