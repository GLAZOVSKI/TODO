class Task {
    notepadObj = [];

    issetNotepad(notepad) {
        let isset = (localStorage.getItem(notepad)) ? true : false;
        return isset;
    }

    getDate() {
        let curDate = new Date();
        let date = curDate.toDateString() + ' ' + curDate.getHours() + ':' +
            curDate.getMinutes() + ':' + curDate.getSeconds();

        return date;
    }

    getNotepad(notepad) {
        this.notepadObj = JSON.parse(localStorage.getItem(notepad));
    }

    updateNotepad(notepad) {
        localStorage.setItem(notepad, JSON.stringify(this.notepadObj));
    }

    createTask(title, notepad){
        let newTask = {
            title,
            priority: false,
            complete: false,
            date: this.getDate()
        }

        if (this.issetNotepad(notepad)) {
            this.getNotepad(notepad);
            this.notepadObj.push(newTask);
            this.updateNotepad(notepad);
        }else {
            return false;
        }
    }

    deleteTask(id, silentDel = true) {
        if (!silentDel) {
            let conf = confirm('Удалить задачу?');

            if (conf) {
                this.notepadObj.splice(id, 1);
            }else {
                return false;
            }
        }else {
            // Удаление без подтверждения
            this.notepadObj.splice(id, 1);
        }

        return true;
    }

    unshiftTask(id) {
        this.notepadObj.splice(1, 0, this.notepadObj[id]);
    }

    pushTask(id) {
        this.notepadObj.push(this.notepadObj[id]);
    }

    changePriority(id) {
        return this.notepadObj[id]['priority'] = !this.notepadObj[id]['priority'];
    }

    changeStatusComplete(id) {
        return this.notepadObj[id]['complete'] = !this.notepadObj[id]['complete'];
    }

    editNameTask(id, newName){
        if (newName.trim()) this.notepadObj[id]['title'] = newName;
    }

    showTask(index = false) {
        let indexId = index ? index : 1;
        let notepad = this.notepadObj;
        let nameNotepad = notepad[0]['name'];
        let notepadLength = index ? index + 1 : notepad.length;

        taskList.innerHTML = '';

        for (let id = indexId; id < notepadLength; id++) {
            let title = notepad[id]['title'];
            let priority = notepad[id]['priority'];
            let complete = notepad[id]['complete'];

            let container = document.createElement('div');
            let containerCheckbox = document.createElement('div');
            let checkbox = document.createElement('input');
            let titleTask = document.createElement('span');
            let containerOption = document.createElement('div');

            let btnPriorityTask = document.createElement('button');
            let btnEditTask = document.createElement('button');

            btnEditTask.className = 'btn priority d-flex justify-content-end';

            btnEditTask.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-list text-light" ' +
                'fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.5 11.5A.5.5 ' +
                '0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.' +
                '5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg>';

            btnPriorityTask.className = 'btn priority d-flex justify-content-end mr-1';

            if (priority) {
                btnPriorityTask.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill text-light" ' +
                    'fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M3.612 15.443c-.386.198-.824-.149-.' +
                    '746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 ' +
                    '0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 ' +
                    '13.187l-4.389 2.256z"/></svg>';
            }else {
                btnPriorityTask.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star text-light" ' +
                    'fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
                    '<path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.' +
                    '824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 ' +
                    '0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 ' +
                    '1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 ' +
                    '1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.' +
                    '894a.503.503 0 0 0-.461 0z"/></svg>';
            }

            if (complete) {
                checkbox.checked = true;
                container.className = 'bg-secondary';
                titleTask.style.textDecoration = 'line-through';
            }else {
                checkbox.checked = false;
                container.className = 'bg-dark';
            }

            containerOption.className = 'position-absolute edit-task d-flex justify-content-center align-items-center';

            titleTask.className = 'd-flex align-items-center';
            titleTask.innerText = title;

            checkbox.type = 'checkbox';

            containerCheckbox.className = 'd-flex justify-content-center align-items-center position-relative';
            containerCheckbox.style.width = '40px';

            container.className += ' text-light col-12 d-flex p-0 rounded my-1';
            container.style.height = '40px';

            containerOption.append(btnPriorityTask, btnEditTask);
            containerCheckbox.append(checkbox);
            container.append(containerCheckbox, titleTask, containerOption);
            taskList.append(container);

            btnPriorityTask.addEventListener('click', () => {
                // Если приоритет изменился на true
                if (this.changePriority(id)) {
                    this.unshiftTask(id);
                    this.deleteTask(id + 1);
                }

                this.updateNotepad(nameNotepad);
                this.showTask();
            });

            checkbox.addEventListener('click', () => {
                // Если задача отмечена как выполнена
                if (this.changeStatusComplete(id)) {
                    this.pushTask(id);
                    this.deleteTask(id);
                }

                this.updateNotepad(nameNotepad);
                this.showTask();
            });

            btnEditTask.onclick = () => {
                showWindowEditTask();

                btnDeleteTask.onclick = () => {
                    if (this.deleteTask(id, false)) {
                        this.updateNotepad(nameNotepad);
                        this.showTask();
                        hideWindowEditTask();
                    }
                };

                btnSaveTask.onclick = () => {
                    this.editNameTask(id, newNameTask.value);
                    this.updateNotepad(nameNotepad);
                    this.showTask();
                    hideWindowEditTask();
                }
            };
        }

        if (notepad.length == 1) { // 1 всегда будет потому что 0 элемент это данные о блокноте
            taskList.innerHTML = '<div class="bg-secondary h6 col-12' +
                ' rounded p-2 text-light">Список задач пуст!</div>';
        }

    }

    sort(property) {
        if (property === 'priority' || property === 'date') {
            this.notepadObj.sort((prev, next) => {
                if ( prev[property] > next[property] ) return -1;
                if ( prev[property] < next[property]) return 1;
            });
        }else {
            this.notepadObj.sort((prev, next) => {
                if ( prev[property] < next[property] ) return -1;
                if ( prev[property] > next[property]) return 1;
            });
        }

        this.showTask();
    }

    search(value) {
        let index = this.notepadObj.findIndex(item => item['title'] == value.trim());

        if (index === -1) return false;
        this.showTask(index);
        return true;
    }
}