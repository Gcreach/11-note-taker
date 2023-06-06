const express = require('express');
const PORT = 3001;
const app = express();
const fs = require('fs');
const util = require('util');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(patch.join(__dirname, `/public/index.html`));
});

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    res.sendFile(patch.join(__dirname, `/public/index.html`));
});

app.post('/api/notes', (req, res) => {
    const addNote = req.body

    readAndAppend(addNote, './db/db.json');
    res.json(`Note added successfully`);
});

app.listen(PORT, () =>
console.log(`Express server listening on port ${PORT}!`)
);