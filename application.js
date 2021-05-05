//const { app, BrowserWindow } = require('electron')
const { app, Tray, Menu, dialog, globalShortcut } = require('electron')
const { BrowserWindow } = require('electron')
const { ipcMain } = require('electron')
const path = require("path")
const AutoLaunch = require('auto-launch')
var mainWindow
var autoLaunch

function createWindow () {
  const win = new BrowserWindow({
    //titleBarStyle: "hidden",
    frame: false,
    maximizable: false,
    //alwaysOnTop: true,
    skipTaskbar: true,
    show: false,
    //backgroundColor: '#3b10e6',
    transparent: true,
    fullscreenable: false,
    hasShadow: true,
    width: 800,
    height: 600,
    minimizable: true,
    minWidth: 470,
    minHeight: 260,
    resizable: false,
    //defaultFontFamily: "monospace",
    webPreferences: {
      enableRemoteModule: true,
      nodeIntegration: true,
      spellcheck: true
    }
  })
  let tray = null
  win.on('minimize', function (event) {
    event.preventDefault();
    win.setSkipTaskbar(true);
    tray = createTray();
  });

  win.on('restore', function (event) {
    win.show();
    win.setSkipTaskbar(false);
    tray.destroy();
  })
  win.loadFile('views/index.html')

  return win
  //win.webContents.openDevTools()
}
function createTray() {
  let appIcon = new Tray(/*path.join(__dirname, "cloud_fun.ico")*/"file/question_mark.ico");
  const contextMenu = Menu.buildFromTemplate([
      {
          label: 'Show', click: function () {
              mainWindow.show();
          }
      },
      {
          label: 'Exit', click: function () {
              app.isQuiting = true;
              app.quit();
          }
      }
  ]);
  appIcon.on('double-click', function (event) {
      mainWindow.show();
  });
  appIcon.setToolTip('Question Mark');
  appIcon.setContextMenu(contextMenu);
  return appIcon;
}

app.whenReady().then(() => {
  const simpleShort = globalShortcut.register('CommandOrControl+Alt+S', () => {
    //console.log('CommandOrControl+X is pressed')
    mainWindow.show()
  })
  const complexShort = globalShortcut.register('Super+Alt+S', () => {
    //console.log('CommandOrControl+X is pressed')
    mainWindow.show()
  })
  if (!simpleShort && !complexShort) {
    console.log('registration failed')
  }
  autoLaunch = new AutoLaunch({
    name: 'Your app name goes here',
    path: app.getPath('exe'),
  });
  autoLaunch.isEnabled().then((isEnabled) => {
    if (!isEnabled) autoLaunch.enable();
  });
  mainWindow = createWindow()
  createTray()
})
/*
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
*/
app.setAboutPanelOptions({ applicationName: "Ouestion Mark"})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('will-quit', () => {
  globalShortcut.unregisterAll()
  autoLaunch.disable()
})


app.on("open-file", function(event, path) {
  event.preventDefault();
  filepath = path;
  if (ready) {
      mainWindow.webContents.send('open-file', filepath);
      filepath = null;

      return;
  }
});
ipcMain.on("download", function() {
  const win = BrowserWindow.getFocusedWindow();
})