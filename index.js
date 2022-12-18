const express = require('express');
const fs = require("fs");
const path = require("path");

const app = express();

let port = 8080;

let myDict;
let current;
let total;
let resDict;


app.use(express.static("public"));

app.listen(port, () => {
    console.log(`listening at port ${port}`);
    makeDict();
    makeResult();

});


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

app.get("/tagBtn", (req, res) => {
    res.sendFile(__dirname + "/public/components/tagBtn.js");
});

app.get("/done", (req, res) => { 
    res.sendFile(__dirname + "/public/components/done.js");
});

app.get("/dict", (req, res) => {
    res.sendFile(__dirname + "/dict.json");
});

app.get("/:w", (req, res) => {
    // console.log("1");
    if(req.params.w == "null"){
        let current = myDict.cases[`${myDict.current + 1}`];
        let w;
        if(current){
            w = current[0];
        }
        else{
            w = -1;
        }
        let file = __dirname + `/cases/specificArea/failed_${w}.png`;
        if(fs.existsSync(file)){
            res.sendFile(file);
        }
    }
    else{
        let file = __dirname + `/cases/specificArea/failed_${req.params.w}.png`;
        if(fs.existsSync(file)){
            res.sendFile(file);
        }
    }
});


app.get("/:w/h", (req, res) => {
    // console.log("2");
    let file = __dirname + `/cases/highlight/failed_${req.params.w}h.png`;
    if(fs.existsSync(file)){
        res.sendFile(file);
    }
});

app.get("/answer/:idx/:answer", (req, res) => {
    console.log(req.params.idx, req.params.answer);
    if(req.params.answer === "-1"){
        res.send("Wrong Answered");
    }
    let ans = req.params.answer;
    let idx = req.params.idx;

    myDict.current++;
    resDict[`${idx}`] = ans;

    fs.writeFileSync("result.json", JSON.stringify(resDict));
    fs.writeFileSync("dict.json", JSON.stringify(myDict));

    res.send("answered");
});


function makeDict(){
    let file = "dict.json";
    if(!fs.existsSync(file)){
        let dict = {
            "current": -1
        };

        let hPath = path.join(path.join(__dirname, "cases"), "highlight");
        
        let wIdx = fs.readdirSync(hPath).map(file => file.split("h")[0].split("_")[1]);
        let cIdx = fs.readdirSync(hPath).map(file => file.split("h")[0].split("_")[2]);

        dict.total = cIdx.length;
        dict.cases = {};

        for(let i = 0; i < wIdx.length; i++){
            dict.cases[`${i}`] = [wIdx[i], cIdx[i]];
        }

        let dictStr = JSON.stringify(dict);
        fs.writeFileSync("dict.json", dictStr);
    }
    let dictFile = fs.readFileSync(file, "utf8");
    myDict = JSON.parse(dictFile);
    current = myDict.current;
    total = myDict.total;

}

function makeResult(){
    let resultFile = "result.json";
    if(!fs.existsSync(resultFile)){
        let dict = {};
        fs.writeFileSync("result.json", JSON.stringify(dict));
    }

    let rF = fs.readFileSync(resultFile, "utf8");
    resDict = JSON.parse(rF);
}
