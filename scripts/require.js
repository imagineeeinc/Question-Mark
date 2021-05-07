const { dialog } = require('electron').remote
const { BrowserWindow } = require("electron");
const { app } = require("electron");
const { remote } = require('electron')
const { shell } = require('electron')
win = remote.getCurrentWindow()
const contents = win.webContents
var ipc = require('electron').ipcRenderer

const fs = require('fs');
const fetch = require('node-fetch')

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