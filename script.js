
// script.js
window.onload = function () {
  const name = localStorage.getItem('quicknotes_username');
  if (!name && window.location.pathname.includes("notes.html")) {
    window.location.href = 'index.html';
  }
  if (document.getElementById('welcome') && name) {
    document.getElementById('welcome').innerText = `Welcome, ${name}! 👋`;
    displayNotes();
  }
};

function saveNote() {
  const note = document.getElementById('noteInput').value.trim();
  if (!note) return;

  let notes = JSON.parse(localStorage.getItem('quicknotes_notes')) || [];
  notes.push(note);
  localStorage.setItem('quicknotes_notes', JSON.stringify(notes));

  document.getElementById('noteInput').value = "";
  displayNotes();
}

function displayNotes() {
  const notes = JSON.parse(localStorage.getItem('quicknotes_notes')) || [];
  const container = document.getElementById('notesList');
  container.innerHTML = "";
  notes.forEach((note, i) => {
    const div = document.createElement('div');
    div.className = "note";
    div.innerText = note;
    container.appendChild(div);
  });
}

function clearNotes() {
  if (confirm("Are you sure you want to delete all notes?")) {
    localStorage.removeItem('quicknotes_notes');
    displayNotes();
  }
}

function logout() {
  if (confirm("Logout and clear your session?")) {
    localStorage.removeItem('quicknotes_username');
    window.location.href = 'index.html';
  }
}