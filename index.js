const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());        // Avoid CORS errors in browsers
app.use(express.json()) // Populate req.body

const widgets = [
    { id: 1, name: "Cizzbor", price: 29.99 },
    { id: 2, name: "Woowo", price: 26.99 },
    { id: 3, name: "Crazlinger", price: 59.99 },
]

const csgoknives = [
    { id: 1, name: "RedFang", price: 29.99 ,float: 0.12414},
    { id: 2, name: "Blue Karambit", price: 526.99, float: 0.5125 },
    { id: 3, name: "Chroma Karambit", price: 590.99, float: 0.6136 },
]

app.get('/csgoknives', (req, res) => {
    res.send(csgoknives)
})

app.get('/csgoknives/:id', (req, res) => {
    if (typeof csgoknives[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Knives not found" })
    }
    res.send(csgoknives[req.params.id - 1])
})

app.post('/csgoknives', (req, res) => {
    if (!req.body.name || !req.body.price || !req.body.float) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    let newCsgoknife = {
        id: csgoknives.length + 1,
        price: req.body.price,
        name: req.body.name,
        float: req.body.float
    }
    csgoknives.push(newCsgoknife)
    res.status(201).location('localhost:8080/csgoknives/' + (csgoknives.length)).send(
        newCsgoknife
    )
})

app.get('/widgets', (req, res) => {
    res.send(widgets)
})

app.get('/widgets/:id', (req, res) => {
    const getIndex = widgets.findIndex(w => w.id === parseInt(req.params.id))
    if (typeof widgets[req.params.id - 1] === 'undefined') {
        return res.status(404).send({ error: "Widget not found" })
    }
    res.send(widgets[getIndex])
})

app.post('/widgets', (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ error: 'One or all params are missing' })
    }
    const newId = Math.max(...widgets.map((widget)=>{return widget.id})) + 1
    let newWidget = {
        id: newId,
        price: req.body.price,
        name: req.body.name
    }
    widgets.push(newWidget)
    res.status(201).location('localhost:8080/widgets/' + newId).send(
        newWidget
    )
})

app.delete("/widgets/:id", (req, res) => {
    const deleteIndex = widgets.findIndex(w => w.id=== parseInt(req.params.id))
    if(deleteIndex === -1){
        return res.status(404).send({error: "Widget not found"})
    }
    widgets.splice(deleteIndex, 1)
    res.status(204).send()
})

app.listen(8080, () => {
    console.log(`API up at: http://localhost:8080`)
})