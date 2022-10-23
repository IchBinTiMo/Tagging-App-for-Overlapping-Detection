const express = require('express');
// const open = require("open");

const app = express();

// const router = express.Router();

let port = 3000;

app.use(express.static("public"));

// app.use("/home/light", router);

app.listen(port, () => console.log(`listening at port ${port}`));

// open("http://localhost:3000/home/light");

app.get("/", (req, res) => {

});

app.get("/header", (req, res) => {
    res.sendFile(__dirname + "/public/components/header.js");
});

app.get("/description", (req, res) => {
    res.sendFile(__dirname + "/public/components/description.js");
});

app.get("/startBtn", (req, res) => {
    res.sendFile(__dirname + "/public/components/startBtn.js");
});

app.get("/images", (req, res) => {
    res.sendFile(__dirname + "/public/components/images.js");
});

