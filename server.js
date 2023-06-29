const express = require('express');
const PORT = 3001;
const app = express();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `/public/index.html`));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, `/public/notes.html`));
});

app.get('/api/notes', (req, res) => 
    fs.readFile('./db/db.json', (error, data) => {
        if (error) throw error;
        let notes = JSON.parse(data);
        res.json(notes);
})
);

app.post('/api/notes', (req, res) => {
    const addNote = {...req.body, id: uuidv4()}
    fs.readFile('./db/db.json', (error, data) => {
        if (error) throw error;
        let notes = JSON.parse(data);
        notes.push(addNote);
        fs.writeFileSync('./db/db.json', JSON.stringify(notes));
        res.json(notes);
})
});

app.delete('/api/notes/:id', (req,res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    const filteredNotes = notes.filter(note => note.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(filteredNotes));
    res.json(filteredNotes);
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.listen(PORT, () =>
console.log(`Express server listening on port ${PORT}!`)
);