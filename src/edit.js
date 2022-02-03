import { initializeEditPage, generateLastEdited } from './views';
import { updateNote, removeNote } from './notes';

const noteTitle = document.querySelector('#note-title');
const noteBody = document.querySelector('#note-body');
const removeBtn = document.querySelector('#remove-note');
const lastEdited = document.querySelector('#last-edited');
const noteId = location.hash.substring(1);

initializeEditPage(noteId);

// setup note title input
noteTitle.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        title: e.target.value
    });
    lastEdited.textContent = generateLastEdited(note.updatedAt);
});

// setup note body text area
noteBody.addEventListener('input', (e) => {
    const note = updateNote(noteId, {
        body: e.target.value
    });
    lastEdited.textContent = generateLastEdited(note.updatedAt);
});

// setup remove note button
removeBtn.addEventListener('click', () => {
    removeNote(noteId);
    location.assign('index.html');
});

window.addEventListener('storage', function(e) {
    if(e.key === 'notes') {
        initializeEditPage(noteId);
    }
});