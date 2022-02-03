import { createNote } from "./notes";
import { setFilters } from './filters';
import { renderNotes } from './views';

renderNotes();

const createBtn = document.querySelector('#create-note');
createBtn.addEventListener('click', () => {
    const id = createNote();
    location.assign(`edit.html#${id}`);
});

const myInput = document.querySelector('#search-text');
myInput.addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    });
    renderNotes();
});

const mySelect = document.querySelector('#filter-by');
mySelect.addEventListener('change', (e) => {
    setFilters({
        sortBy: e.target.value
    })
    renderNotes();
});

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        renderNotes();
    }
});