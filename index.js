const express = require("express");
const app = express();
const port = 8080
const swaggerui = require("swagger-ui-express")
const yamljs = require("yamljs")
const swaggerDocument = yamljs.load("./docs/swagger.yaml");
let guests = require("./guests/data");

app.use(express.json());

app.get("/guests", (req, res) => {
    res.send(guests.getAll());
})

app.get("/guests/:id", (req, res) => {
    const guest = guests.getById(req.params.id);
    if (!guest) {
        return res.status(404).send({error: "Guest not found"});
    }
    
    res.send(guest);
});

app.post('/guests', (req, res) => {
    if (!req.body.FirstName || !req.body.LastName || !req.body.PhoneNumber || !req.body.EmailAddress) {
        return res.status(400).send({error: "One or all required params are missing"});
    }

    let createdGuest = guests.create({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        PhoneNumber: req.body.PhoneNumber,
        EmailAddress: req.body.EmailAddress
    });
    
    res.status(201).send(createdGuest);
});

app.use("/docs",swaggerui.serve,swaggerui.setup(swaggerDocument))

app.listen(port, ()=> {
    console.log(`API up at: http://localhost:${port}`);
    console.log(`API up at: http://localhost:${port}/docs`);

})