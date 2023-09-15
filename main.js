const { app, BrowserWindow ,dialog} = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");
let win;
function createWindow() {
  win = new BrowserWindow();
  win.loadFile(path.join(__dirname, "index.html"));
}
app.on("ready", () => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
});
autoUpdater.on("checking-for-update", () => {
    console.log(app.getVersion())
  console.log("checking for updates");
});
autoUpdater.on("update-available", () => {
  dialog.showMessageBox(win,{
    title:"note",
    message:"new Version available",
    buttons:['download']
  }).then(response=>{
    if(response==0)
    {
        autoUpdater.downloadUpdate();
    }
  })
});
autoUpdater.on("update-downloaded", () => {
  dialog.showMessageBox(win,{
    title:'Note',
    message:"update downloaded"
  })
});
autoUpdater.on("download-progress", (progress) => {
    dialog.showMessageBox(win,{
        title:"Note",
        message:"update is downloading",
        buttons:['ok']
    }).then(response=>{
        if(response==0){
        }
    })
});
