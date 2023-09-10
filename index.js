const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());        // Avoid CORS errors in browsers
app.use(express.json()); // Populate req.body

//Kui lähme localhosti saame client.htmli vastusena
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client.html'));
});

//Noade andmete sisse lisamiseks
const csgoknives = [
    { id: 1, name: "RedFang", price: 29.99, float: 0.12414 },
    { id: 2, name: "Blue Karambit", price: 526.99, float: 0.5125 },
    { id: 3, name: "Chroma Karambit", price: 590.99, float: 0.6136 },
];

// Saa kõik noad
app.get('/csgoknives', (req, res) => {
    res.send(csgoknives);
});

// Nuga id järgi
app.get('/csgoknives/:id', (req, res) => {
    const knifeIndex = csgoknives.findIndex(k => k.id === parseInt(req.params.id));
    if (knifeIndex === -1) {
        return res.status(404).send({ error: "Knives not found" });
    }
    res.send(csgoknives[knifeIndex]);
});

// Uue noa lisamiseks
app.post('/csgoknives', (req, res) => {
    if (!req.body.name || !req.body.price || !req.body.float) {
        return res.status(400).send({ error: 'One or all params are missing' });
    }
    const newId = Math.max(...csgoknives.map(knife => knife.id)) + 1;
    let newCsgoknife = {
        id: newId,
        price: req.body.price,
        name: req.body.name,
        float: req.body.float
    };
    csgoknives.push(newCsgoknife);
    res.status(201).location(`localhost:8080/csgoknives/${newId}`).send(newCsgoknife);
});

// Kustuta nuga id järgi
app.delete("/csgoknives/:id", (req, res) => {
    const deleteIndex = csgoknives.findIndex(k => k.id === parseInt(req.params.id));
    if (deleteIndex === -1) {
        return res.status(404).send({ error: "Knives not found" });
    }
    csgoknives.splice(deleteIndex, 1);
    res.status(204).send();
});

app.listen(8080, () => {
    console.log(`API up at: http://localhost:8080`);
});
