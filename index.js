require("dotenv").config()

const express = require("express");
const app = express();
const port = process.env.PORT;
const swaggerui = require("swagger-ui-express")
const yamljs = require("yamljs")
const swaggerDocument = yamljs.load("./docs/swagger.yaml");
const  {Sequelize} = require("sequelize")
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USER, process.env.DB_PASS,{
    host: process.env.DB_HOST,
    dialect: "mariadb"
})

try {
    sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

let guests = require("./guests/data");
let rooms = require("./rooms/data");

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

app.delete("/guests/:id", (req, res) => {
    const isDeleted = guests.delete(req.params.id);
    if (!isDeleted) {
        return res.status(404).send({error: "Guest not found"});
    }
    res.status(200).send({message: "Successfully deleted the guest"});
});

app.put("/guests/:id", (req, res) => {
    const updatedGuest = guests.update(req.params.id, req.body);
    if (!updatedGuest) {
        return res.status(404).send({error: "Guest not found or update failed"});
    }
    res.status(200).send({message: "Guests data successfully updated", data: updatedGuest});
});

app.use("/docs",swaggerui.serve,swaggerui.setup(swaggerDocument))


app.get("/rooms", (req, res) => {
    res.send(rooms.getAll());
})

app.listen(port, ()=> {
    console.log(`API up at: http://localhost:${port}`);
    console.log(`API up at: http://localhost:${port}/docs`);

})