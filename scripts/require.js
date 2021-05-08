const { dialog } = require('electron').remote
const { BrowserWindow } = require("electron");
const { app } = require("electron");
const { remote } = require('electron')
const { shell } = require('electron')
win = remote.getCurrentWindow()
const contents = win.webContents
var ipc = require('electron').ipcRenderer

const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

document.body.onclick = function() {
    console.log(fromDir("./", 'index.html'))
}
function fromDir(startPath,filter){
    var list = []
    if (!fs.existsSync(startPath)){
        console.log("no dir ",startPath);
        return;
    }

    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            fromDir(filename,filter); //recurse
        }
        else if (filename.indexOf(filter)>=0) {
            list.push(filename)
        };
    };
    return list
}
/*
var search = "imagineeeinc"
fetch(`https://www.google.com/search?q=${search}`)
    .then(res => res.text())
    .then(body => {var doc = new DOMParser().parseFromString(body, "text/html");links(doc.body)})

function links(body) {
    let bo = body.querySelectorAll("a")
    for(var i=0;i < body.querySelectorAll("a").length;i++) {
        bo[i].href = "https://google.com" + bo[i].href
    }
    for(var i=0;i < body.querySelectorAll("a").length;i++) {
        let link = bo[i].href
        console.log(link)
    }
}
*/