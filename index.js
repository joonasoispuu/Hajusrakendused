const app = require("express")()
const port = 8080
const swaggerui = require("swagger-ui-express")
const yamljs = require("yamljs")
const swaggerDocument = yamljs.load("./docs/swagger.yaml");

const guests = [
    { GuestID: 1, FirstName: "Pablo", LastName: "Gonzalez", PhoneNumber: "523456789", EmailAddress: "Gonzales12@gmail.com.com" },
    { GuestID: 2, FirstName: "John", LastName: "Man", PhoneNumber: "512638592", EmailAddress: "hotmale@hotmail.com" },
    { GuestID: 3, FirstName: "Robert", LastName: "Man", PhoneNumber: "592918374", EmailAddress: "seedswallower12@gmail.com" },
    { GuestID: 4, FirstName: "Albert", LastName: "Ott", PhoneNumber: "5281748590", EmailAddress: "topmunch@gmail.com" }
];

app.get("/guests", (req, res) =>{
    res.send(guests)
})

app.get("/guests/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id) || id <= 0 || id > guests.length) {
        return res.status(404).send({error: "Guest not found"});
    }
    
    res.send(guests[id - 1]);
});

app.use("/docs",swaggerui.serve,swaggerui.setup(swaggerDocument))

app.listen(port, ()=> {
    console.log(`API up at: http://localhost:${port}`);
})