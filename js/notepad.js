class Notepad {
    notepad = []; // Блокнот который получаем по запросу из getNotepad
    notepadsList = []; // Все блокноты

    currentNotepad = {
        name: null,
        color: '#222222'
    };

    createNotepad(name, color = this.currentNotepad.color) {
        let newNotepad = [{
            name,
            color,
            createDate: this.getDate()
        }];

        if (!name.trim()) newNotepad[0]['name'] = 'Список дел';
        if (color === false) newNotepad[0]['color'] = '#222222';

        if (this.issetNotepad(newNotepad[0]['name'])) {
            let conf = confirm('Блокнот с таким именем существует. Вы хотити его перезаписать?');

            if (conf) {
                localStorage.setItem(newNotepad[0]['name'], JSON.stringify(newNotepad));
            }
        }else {
            localStorage.setItem(newNotepad[0]['name'], JSON.stringify(newNotepad));
        }

        this.getAllNotepads();
        this.showAllNotepads();
    }

    issetNotepad(notepad) {
        let isset = (localStorage.getItem(notepad)) ? true : false;
        return isset;
    }

    getDate() {
        let curDate = new Date();
        let date = curDate.toDateString() + ' ' + curDate.getHours() + ':' + curDate.getMinutes() + ':' + curDate.getSeconds();
        return date;
    }

    getNotepad(name) {
        this.notepad = JSON.parse(localStorage.getItem(name));
        return this.notepad;
    }

    updateNotepad() {
        let newNameNotepad = this.notepad[0]['name'];

        this.deleteNotepad(this.currentNotepad.name, true);
        this.currentNotepad.name = newNameNotepad;

        localStorage.setItem(newNameNotepad, JSON.stringify(this.notepad));

        this.getAllNotepads();
        this.showAllNotepads();
    }

    getAllNotepads() {
        this.notepadsList = [];

        for (let key in localStorage) {
            if (!localStorage.hasOwnProperty(key)) continue;
            this.notepadsList.push(JSON.parse(localStorage.getItem(key)));
        }
    }

    deleteNotepad(silentDel = false) {
        if (!silentDel) {
            let conf = confirm('Удалить блокнот?');

            if (conf) {
                delete localStorage[this.currentNotepad.name];
            }else {
                return false;
            }
        }else {
            // Удаление без подтверждения
            delete localStorage[this.currentNotepad.name];
        }

        this.getAllNotepads();
        this.showAllNotepads();

        return true;
    }

    editNotepad(newName = false, newColor = false, notepad = null) {
        notepad = (notepad === null) ? this.currentNotepad.name : notepad;

        this.getNotepad(notepad);

        // Замена значений в блокноте из getNotepad
        if (newName.trim()) this.notepad[0]['name'] = newName;
        if (newColor !== false) this.notepad[0]['color'] = newColor;

        this.updateNotepad();
    }

    showAllNotepads() {
        allNotepads.innerHTML = '';

        for (let key in this.notepadsList) {
            let allNotepads = document.getElementById('allNotepads');

            let containerNotepad = document.createElement('div');
            let dateNotepad = document.createElement('div');
            let nameNotepad = document.createElement('span');

            let currentNameNotepad = this.notepadsList[key][0]['name'];
            let currentColorNotepad = this.notepadsList[key][0]['color'];

            nameNotepad.innerText = currentNameNotepad;

            dateNotepad.className = 'date-notepad-list';
            dateNotepad.innerText = this.notepadsList[key][0]['createDate'];

            containerNotepad.className = 'col-12 p-3 rounded text-light my-1 position-relative container-notepad-list';
            containerNotepad.style.backgroundColor = this.notepadsList[key][0]['color'];

            containerNotepad.addEventListener('click', () => {
                showNotepad();
                saveDataOpenedNotepad(currentNameNotepad, currentColorNotepad);
                insertDataInNotepad();
                showTask();
            });

            containerNotepad.append(nameNotepad, dateNotepad);
            allNotepads.append(containerNotepad);
        }

        if (this.notepadsList.length == 0) {
            allNotepads.innerHTML = '<div class="bg-secondary h6 col-12' +
                ' rounded p-2 text-light">Список блокнотов пуст!</div>';
        }
    }
}