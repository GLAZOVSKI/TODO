let allNotepads = document.getElementById('allNotepads');
let nameNotepad = document.getElementById('nameNotepad');

let windowCreateNotepad = document.getElementById('windowCreateNotepad');
let windowEditTask = document.getElementById('windowEditTask');
let windowNotepad = document.getElementById('windowNotepad');
let shadow = document.getElementById('shadow');
let taskList = document.getElementById('taskList');

let titleWindowCreateNotepad = document.getElementById('formTitle');
let btnCloseFormCreateNotepad = document.getElementById('formClose');
let btnFormCreateNotepad = document.getElementById('formSave');

let formNameNotepad = document.getElementById('formNameNotepad');
let formColorNotepad = document.getElementById('formColorNotepad');

let newNameTask = document.getElementById('newNameTask');

let btnEditNotepad = document.getElementById('editNotepad');
let btnAddTask = document.getElementById('addTask');
let btnDeleteNotepad = document.getElementById('deleteNotepad');
let btnCloseWindowNotepad = document.getElementById('closeWindowNotepad');
let btnCreateNotepad = document.getElementById('addNotepad');

let btnCloseEditTask = document.getElementById('closeEditTask');
let btnDeleteTask = document.getElementById('deleteTask');
let btnSaveTask = document.getElementById('saveTask');

let selectSort = document.getElementById('sort');
let btnSort = document.getElementById('btnSort');

let inputSearch = document.getElementById('inputSearch');
let btnSearch = document.getElementById('btnSearch');

let changeColor = false; // Был ли изменен цвет

let master = new Notepad();
let task = new Task();

master.getAllNotepads();
master.showAllNotepads();


btnSearch.onclick = () => {
    if (inputSearch.value.trim()){
        if (!task.search(inputSearch.value)) {
            taskList.innerHTML = '<div class="bg-secondary h6 col-12 rounded p-2 text-light">Нечего не найдено!</div>';
        }
    }
}

btnSort.onclick = () => {
    task.sort(selectSort.value);
}

btnCloseEditTask.onclick = () => {
    hideWindowEditTask();
}

btnAddTask.onclick = () => {
    addTask();
}

formColorNotepad.onchange = () => {
    changeColor = formColorNotepad.value;
}

btnEditNotepad.onclick = () => {
    titleWindowCreateNotepad.innerText = 'Изменить блокнот';
    formNameNotepad.value = master.currentNotepad.name;

    btnFormCreateNotepad.addEventListener('click', editNotepad);
    btnFormCreateNotepad.removeEventListener('click',createNotepad);
    formColorNotepad.value = master.currentNotepad.color;

    showWindowCreateNotepad();
}

btnCreateNotepad.onclick = () => {
    titleWindowCreateNotepad.innerText = 'Создать блокнот';

    btnFormCreateNotepad.addEventListener('click', createNotepad);
    btnFormCreateNotepad.removeEventListener('click',editNotepad);

    showWindowCreateNotepad();
}

btnCloseFormCreateNotepad.onclick = () => {
    hideWindowCreateNotepad();
}

btnCloseWindowNotepad.onclick = () => {
    hideNotepad();
}

btnDeleteNotepad.onclick = () => {
    if (master.deleteNotepad()) {
        hideNotepad();
    }
}

shadow.onclick = () => {
    hideWindowCreateNotepad();
    hideWindowEditTask();
}


function showWindowEditTask() {
    shadow.style.display = 'block';
    windowEditTask.style.display = 'block';
}

function hideWindowEditTask() {
    shadow.style.display = 'none';
    windowEditTask.style.display = 'none';
    newNameTask.value = '';
}

function showTask() {
    task.getNotepad(master.currentNotepad.name);
    task.showTask();
}

function addTask() {
    let newTask = prompt("Добавить задачу").trim();
    if (!newTask) return false;
    task.createTask(newTask, master.currentNotepad.name);
    showTask();
}

function editNotepad() {
    master.editNotepad(formNameNotepad.value, changeColor);
    master.currentNotepad.color = changeColor;

    hideWindowCreateNotepad();
    insertDataInNotepad();
}

function createNotepad() {
    master.createNotepad(formNameNotepad.value, formColorNotepad.value);
    hideWindowCreateNotepad();
}

function showWindowCreateNotepad() {
    shadow.style.display = 'block';
    windowCreateNotepad.style.display = 'block';
}

function hideWindowCreateNotepad() {
    shadow.style.display = 'none';
    windowCreateNotepad.style.display = 'none';

    clearFormCreateNotepad();
}

function clearFormCreateNotepad(){
    formNameNotepad.value = '';
    formColorNotepad.value = '#222222';
}

function showNotepad () {
    windowNotepad.style.animation = 'showStart 0.5s';
    windowNotepad.style.display = 'block';
    inputSearch.value = '';
}

function hideNotepad(){
    windowNotepad.style.animation = 'showEnd 0.5s';

    setTimeout(() => {
        windowNotepad.style.display = 'none';
    }, 500);
}

function saveDataOpenedNotepad(name, color){
    master.currentNotepad.name = name;
    master.currentNotepad.color = color;
}

function insertDataInNotepad(){
    nameNotepad.innerText = master.currentNotepad.name;
}
