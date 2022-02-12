const Pin = document.querySelector('[data-pin]');
const modalTask = document.querySelector('[data-modalTask]');
const modalEdit = document.querySelector('[data-modalEdit]');
const textArea = document.querySelectorAll('.add-task textarea');
const createTask = document.querySelector('[data-createTask]');
const closeModal = document.querySelectorAll('.close');
const taskList = document.querySelector('.tasklist a');
const subList = document.querySelector('.sublist');
const accord = document.querySelector('[data-accordion]');
const addTaskBtn = document.querySelector('[data-addTask]');
const manageTasks = document.querySelectorAll('.task__list');
const filterTasks = document.querySelectorAll('.filter-tasks');
Pin.addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    const wrapper = document.querySelector('.task-wrapper');
    Pin.classList.toggle('rotate');
    sidebar.classList.toggle('active');
    wrapper.classList.toggle('slideLeft');
});
textArea.forEach(item => {
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

// task list object of array (structure)
const tasks = {
    import: [],
    personal: [],
    work: [],
    sport: [],
    course: []
};
// define new task 
function addNewTask() {
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
    switch (addSelectTask.options[addSelectTask.selectedIndex].value) {
        case 'import':
            const addImport = document.querySelector('[data-import]');
            addImport.appendChild(li);
            tasks.import.push({
                title: textArea[0].value,
                text: textArea[1].value
            });
            break;
        case 'personal':
            const addPerson = document.querySelector('[data-personal]');
            addPerson.appendChild(li);
            tasks.personal.push({
                title: textArea[0].value,
                text: textArea[1].value
            });
            break;
        case 'work':
            const addWork = document.querySelector('[data-work]');
            addWork.appendChild(li);
            tasks.work.push({
                title: textArea[0].value,
                text: textArea[1].value
            });
            break;
        case 'sport':
            const addSprot = document.querySelector('[data-sport]');
            addSprot.appendChild(li);
            tasks.sport.push({
                title: textArea[0].value,
                text: textArea[1].value
            });
            break;
        case 'course':
            const addCourse = document.querySelector('[data-course]');
            addCourse.appendChild(li);
            tasks.course.push({
                title: textArea[0].value,
                text: textArea[1].value
            });
            break;
    }
    saveToLoacal(tasks); // add task list in lical storage;
    textArea.forEach(item => {
        item.value = '';
    });
}
// manage add Tasks ===> edit * remove * checked compelete
let lastIndexChild; //  get last index of array element child
function manageTask(e) {
    const editTaskBtn = document.querySelector('[data-editTask]');
    const clastList = [...e.target.classList]; //* select target class name for delete edit complete
    const dataSet = {
        ...e.target.closest('ul').dataset
    }; //get dataset
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
            const child = [];
            child.push([...e.target.closest('li').firstElementChild.children]); //* select previous div(.task-item)
            lastIndexChild = child.slice(-1);
            const textEdit = document.querySelectorAll('.edit-tasks textarea');
            modalEdit.classList.add('activeModal');
            editTaskBtn.addEventListener('click', () => {
                const beforEdit = {
                    title: lastIndexChild[0][1].innerHTML.trim(),
                    text: lastIndexChild[0][2].innerHTML.trim()
                };
                if (textEdit[0].value == '' || textEdit[1].value == '') return;
                lastIndexChild[0][1].innerHTML = textEdit[0].value.trim();
                lastIndexChild[0][2].innerHTML = textEdit[1].value.trim();
                const afterEdit = {
                    title: lastIndexChild[0][1].innerHTML,
                    text: lastIndexChild[0][2].innerHTML
                };
                editOflocal(dataSet, beforEdit, afterEdit);
                textEdit.forEach(item => item.value = '');
            });
            break;
        case 'fa-trash':
            const li = e.target.closest('li'); // find ancesst element li for remove
            const targets = [...e.target.closest('li').firstElementChild.children];
            // get title and text task
            const selectedRow = {
                title: targets[1].innerHTML,
                text: targets[2].innerHTML
            };
            removeOfLocal(dataSet, selectedRow);
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
// save all task to local storage
function saveToLoacal(task) {
    const saveLoacal = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    saveLoacal.push(task);
    localStorage.setItem('tasks', JSON.stringify(saveLoacal));

}
// load task when load document
function getOfLocal() {
    const saveLoacal = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    const lastIndex = saveLoacal.slice(-1); // giv last index of loacal that is  last update of tasks
    // add loap to for view tasks
    lastIndex.forEach(item => {
        for (const key in item) {
            const elem = item[key];
            if (elem == '') { // jump from empty fild
                continue;
            } else {
                switch (key) {
                    case 'import':
                        const addImport = document.querySelector('[data-import]');
                        for (let i in elem) {
                            const tasks = elem[i];
                            const li = document.createElement('li');
                            li.innerHTML = ` <div class="task-item">
                            <span><i class="far fa-check"></i></span>
                            <p>${tasks.title} </p>
                            <p>${tasks.text}</p>
                        </div>
                        <div class="task-control">
                            <span><i class="fal fa-pen"></i></span>
                            <span><i class="fal fa-trash"></i></span>
                        </div>`;
                            addImport.appendChild(li);
                        }
                        break;
                    case 'personal':
                        const addPerson = document.querySelector('[data-personal]');
                        for (let i in elem) {
                            const tasks = elem[i];
                            const li = document.createElement('li');
                            li.innerHTML = ` <div class="task-item">
                            <span><i class="far fa-check"></i></span>
                            <p>${tasks.title} </p>
                            <p>${tasks.text}</p>
                        </div>
                        <div class="task-control">
                            <span><i class="fal fa-pen"></i></span>
                            <span><i class="fal fa-trash"></i></span>
                        </div>`;
                            addPerson.appendChild(li);

                        }
                        break;
                    case 'work':
                        const addWork = document.querySelector('[data-work]');
                        for (let i in elem) {
                            const tasks = elem[i];
                            const li = document.createElement('li');
                            li.innerHTML = ` <div class="task-item">
                            <span><i class="far fa-check"></i></span>
                            <p>${tasks.title} </p>
                            <p>${tasks.text}</p>
                        </div>
                        <div class="task-control">
                            <span><i class="fal fa-pen"></i></span>
                            <span><i class="fal fa-trash"></i></span>
                        </div>`;
                            addWork.appendChild(li);
                        }
                        break;
                    case 'sport':
                        const addSprot = document.querySelector('[data-sport]');
                        for (let i in elem) {
                            const tasks = elem[i];
                            const li = document.createElement('li');
                            li.innerHTML = ` <div class="task-item">
                            <span><i class="far fa-check"></i></span>
                            <p>${tasks.title} </p>
                            <p>${tasks.text}</p>
                         </div>
                        <div class="task-control">
                            <span><i class="fal fa-pen"></i></span>
                            <span><i class="fal fa-trash"></i></span>
                        </div>`;
                            addSprot.appendChild(li);
                        }
                        break;
                    case 'course':
                        const addCourse = document.querySelector('[data-course]');
                        for (let i in elem) {
                            const tasks = elem[i];
                            const li = document.createElement('li');
                            li.innerHTML = ` <div class="task-item">
                            <span><i class="far fa-check"></i></span>
                            <p>${tasks.title} </p>
                            <p>${tasks.text}</p>
                        </div>
                        <div class="task-control">
                            <span><i class="fal fa-pen"></i></span>
                            <span><i class="fal fa-trash"></i></span>
                                    </div>`;
                            addCourse.appendChild(li);
                        }
                        break;
                }
            }
        }
    });
}

function removeOfLocal(dataset, obj) {
    const saveLoacal = JSON.parse(localStorage.getItem('tasks')) || [];
    const lastIndex = saveLoacal.slice(-1); // giv last index of loacal that is  last update of tasks
    const parentTarget = Object.keys(dataset) + "";
    const selectItem = obj;
    lastIndex.forEach(item => {
        for (let key in item) {
            let elem = item[key];
            if (key == parentTarget) {
                switch (parentTarget) {
                    case 'import':
                        elem = elem.filter(item => item.title !== selectItem.title && item.text !== selectItem.text);
                        if (elem == []) {
                            tasks.import = [];
                        } else {
                            tasks.import = [...elem];
                            saveToLoacal(tasks);
                        }
                        break;
                    case 'personal':

                        elem = elem.filter(item => item.title !== selectItem.title && item.text !== selectItem.text);
                        if (elem == []) {
                            tasks.personal = [];
                        } else {
                            tasks.personal = [...elem];
                            saveToLoacal(tasks);
                        }
                        break;
                    case 'work':
                        elem = elem.filter(item => item.title !== selectItem.title && item.text !== selectItem.text);
                        if (elem == []) {
                            tasks.work = [];
                        } else {
                            tasks.work = [...elem];
                            saveToLoacal(tasks);
                        }
                        break;
                    case 'sport':
                        elem = elem.filter(item => item.title !== selectItem.title && item.text !== selectItem.text);
                        if (elem == []) {
                            tasks.sport = [];
                        } else {
                            tasks.sport = [...elem];
                            saveToLoacal(tasks);
                        }
                        break;
                    case 'course':
                        // console.log(elem, selectItem);
                        elem = elem.filter(item => item.title !== selectItem.title && item.text !== selectItem.text);
                        if (elem == []) {
                            tasks.course = [];
                        } else {
                            tasks.course = [...elem];
                            saveToLoacal(tasks);
                        }
                        break;
                }

            }
        }
    });

}

function editOflocal(dataset, befor, after) {
    const saveLoacal = JSON.parse(localStorage.getItem('tasks')) || [];
    const lastIndex = saveLoacal.slice(-1); // giv last index of loacal that is  last update of tasks
    const parentTarget = Object.keys(dataset) + "";
    lastIndex.forEach(item => {
        for (let key in item) {
            let elem = item[key];
            if (key == parentTarget) {
                switch (parentTarget) {
                    case 'import':
                        for (let index of elem) {
                            if (index.title == befor.title && index.text == befor.text) {
                                index.title = after.title;
                                index.text = after.text;
                            }
                        }
                        //update object value
                        tasks.import = [...elem];
                        saveToLoacal(tasks);
                        break;
                    case 'personal':
                        for (let index of elem) {
                            if (index.title == befor.title && index.text == befor.text) {
                                index.title = after.title;
                                index.text = after.text;
                            }
                        }
                        //update object value
                        tasks.personal = [...elem];
                        saveToLoacal(tasks);
                        break;
                    case 'work':
                        for (let index of elem) {
                            if (index.title == befor.title && index.text == befor.text) {
                                index.title = after.title;
                                index.text = after.text;
                            }
                        }
                        //update object value
                        tasks.work = [...elem];
                        saveToLoacal(tasks);
                        break;
                    case 'sport':
                        for (let index of elem) {
                            if (index.title == befor.title && index.text == befor.text) {
                                index.title = after.title;
                                index.text = after.text;
                            }
                        }
                        //update object value
                        tasks.sport = [...elem];
                        saveToLoacal(tasks);
                        break;
                    case 'course':
                        for (let index of elem) {
                            if (index.title == befor.title && index.text == befor.text) {
                                index.title = after.title;
                                index.text = after.text;
                            }
                        }
                        //update object value
                        tasks.course = [...elem];
                        saveToLoacal(tasks);
                        break;
                }

            }
        }
    });
}
accord.addEventListener('click', slidAcoord);
addTaskBtn.addEventListener('click', addNewTask);
filterTasks.forEach(select => select.addEventListener('click', filterTask));
manageTasks.forEach(ul => ul.addEventListener('click', manageTask));
document.addEventListener('DOMContentLoaded', getOfLocal);