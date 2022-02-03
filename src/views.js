import moment from 'moment';
import { getFilters } from './filters';
import { getNotes, sortNotes } from './notes';

// Generate note DOM Structure
const generateNoteDOM = (note) => {
    const noteElement = document.createElement('a');
    const noteText = document.createElement('p');
    const statusElement = document.createElement('p');

    // setup the note title text
    if(note.title.length > 0) {
        noteText.textContent = note.title;
    } else {
        noteText.textContent = 'Unnamed Note';
    }
    noteText.classList.add('list-item__title');
    noteElement.appendChild(noteText);

    // setup the link
    noteElement.setAttribute('href', `edit.html#${note.id}`);
    noteElement.classList.add('list-item');

    statusElement.textContent = generateLastEdited(note.updatedAt);
    statusElement.classList.add('list-item__subtitle');
    noteElement.appendChild(statusElement);

    return noteElement;
}

// Render application note 
const renderNotes = () => {
    const notesElement = document.querySelector('.notes');
    const filters = getFilters();
    const notes = sortNotes(filters.sortBy);
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

    notesElement.innerHTML = '';

    if(filteredNotes.length > 0) {
        filteredNotes.forEach((note) => {
            const noteElement = generateNoteDOM(note);
            notesElement.appendChild(noteElement);
        });
    } else {
        const emptyMsg = document.createElement('p');
        emptyMsg.textContent = 'No notes to show';
        emptyMsg.classList.add('empty__msg')
        notesElement.appendChild(emptyMsg);
    }
}

const initializeEditPage = (noteId) => {
    const noteTitle = document.querySelector('#note-title');
    const noteBody = document.querySelector('#note-body');
    const lastEdited = document.querySelector('#last-edited');
    const notes = getNotes();
    const note = notes.find((note) => note.id === noteId);

    if(!note) {
        location.assign('index.html');
    }

    noteTitle.value = note.title;
    noteBody.value = note.body;
    lastEdited.textContent = generateLastEdited(note.updatedAt);
}

// generate the last edited message
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`;

export { generateNoteDOM, renderNotes, generateLastEdited, initializeEditPage };