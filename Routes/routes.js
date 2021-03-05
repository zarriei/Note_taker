const fs = require('fs');
const path = require('path');
// const db = require('../Develo/p/db/db.json')
// ROUTING
module.exports = app => {
    // setting up the note const
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        const notes = JSON.parse(data);
        // API ROUTES
        // GET route for the api/notes
        app.get('/api/notes', (req, res) => {
            // this reads the db.json file and returns all saved notes as JSON
            res.json(notes);
            console.log(notes);
        });
        // POST route for the api/notes
        // api/ also allows other coders to know that this is referencing json data
        app.post('/api/notes', (req, res) => {
            let newNote = req.body;
            notes.push(newNote);
            dbUpdate();
            return console.log(`New note added: ${newNote.title}`);
        });
        // setting and getting a specfici ID to each note
        app.get('/api/notes/:id', (req, res) => {
            res.json(notes[req.params.id]);
        });
        // because we set the id above we can now target it and delete it
        app.delete('/api/notes/:id', (req, res) => {
            notes.splice(req.params.id, 1);
            dbUpdate();
            console.log(`CTRL ALT DEL ${req.params.id}`);
        });
        // HTML ROUTES
        // to view notes.html 
        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/notes.html'));
        });
        // when any other route is accessed display index.html
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });
        // updating the json whenever something is adjusted
        const dbUpdate = () => {
            fs.writeFile('./db/db.json', JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        };
    });
}; 