const http = require('http');
const express = require('express');
const app = express();

app.use(express.json());

let notes = [
    {
        id: 1,
        content: 'HTML is easy',
        date: '2022-05-30T17:30:31.098Z',
        important: true,
    },
    {
        id: 2,
        content: 'Browser can execute only Javascript',
        date: '2022-05-30T18:39:34.091Z',
        important: false,
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        date: '2022-05-30T19:20:14.298Z',
        important: true,
    },
]


app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (req, res) => {
    res.json(notes);
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find(note => note.id === id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }
});

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(note => note.id !== id);

    res.status(204).end();
})

app.post('/api/notes', (req, res) => {
    const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0;

    const body = req.body;

    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
    };

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: maxId + 1,
    };

    notes = notes.concat(note);

    res.json(note);
})

// =============================== EXERCISES ======================

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/api/persons', (req, res) => {
    res.send(phonebook);
});

app.get('/info', (req, res) => {
    const count = phonebook.length;
    const time = new Date();
    console.log(count, time);
    res.send(`Phonebook has info for ${count} people. \n ${time}`);
});

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = phonebook.find(item => item.id == id);
    
    if (!person) {
        return res.status(404).end();
    } else {
        res.send(person);
    }
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    phonebook = phonebook.filter(item => item.id != id);
    
    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const newId = Math.round(Math.random()*1000000000);
    const body = req.body;

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name/number not provided'
        });
    };

    if (phonebook.find(item => item.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        });
    };

    const person = {
        id: newId,
        name: body.name,
        number: body.number,
    };

    phonebook.push(person);

    res.json(person);


})


const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server is running on port: ${PORT}`));