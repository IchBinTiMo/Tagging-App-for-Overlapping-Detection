const express = require('express');

const app = express();


let port = 3000;

app.use(express.static("public"));

app.listen(port, () => console.log(`listening at port ${port}`));


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
