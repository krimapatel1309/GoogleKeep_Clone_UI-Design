const addButton = document.querySelector("#add");

const updateLocalStorage = () => {
    const textareaData = document.querySelectorAll('textarea');
    const notes = [];

    // console.log(textareaData);
    textareaData.forEach((note) => {
        return notes.push(note.value);
    });
    // console.log(notes);
    localStorage.setItem('notesData', JSON.stringify(notes));
}

addNewNote = (text='') => {
    const note = document.createElement('div');
    note.classList.add('note');

    const htmlData = `
    <div class="tools">
        <h2>Your StickyNote</h2>
        <button class="edit" title="Edit/Save"><i class="fas fa-pen-to-square"></i></button>
        <button class="delete" title="Delete"><i class="fas fa-trash"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden"} "></div>
    <textarea class="${text ? "hidden" : ""} " placeholder="Add a note here" ></textarea>`;
    
    note.insertAdjacentHTML('afterbegin', htmlData);
    // console.log(note);

    // <button class="edit"><i class="fa-regular fa-check"></i></button>

    // getting teh referenc3es
    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textarea = note.querySelector('textarea');

    // deleting the node
    delButton.addEventListener('click', () => {
        note.remove();
        updateLocalStorage();
    });

    // toggle using edit button
    // if tehre is some text previously
    textarea.value = text;
    mainDiv.innerHTML = text;

    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textarea.classList.toggle('hidden');
    });


    textarea.addEventListener('change', (e) => {
        const value = e.target.value;
        mainDiv.innerHTML = value;

        updateLocalStorage();
    });


    // appends the note as the last child of div.note
    document.querySelector('.container').appendChild(note);
}

// getting data back from localstorage
const notes = JSON.parse(localStorage.getItem('notesData'));

if(notes) {
    notes.forEach((note) => addNewNote(note));
}

addButton.addEventListener('click', () => addNewNote());
