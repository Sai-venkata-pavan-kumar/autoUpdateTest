const { app, BrowserWindow } = require("electron");
const path = require("path");
const { autoUpdater } = require("electron-updater");
const { Console } = require("console");
let logger = new Console({
  stdout: path.join(__dirname, "logs.txt"),
});
function createWindow() {
  let win = new BrowserWindow();
  win.loadFile(path.join(__dirname, "index.html"));
}
app.on("ready", () => {
  createWindow();
  autoUpdater.checkForUpdatesAndNotify();
});
autoUpdater.on("checking-for-update", () => {
  logger.log("checking for updates");
});
autoUpdater.on("update-available", () => {
  logger.log("update available");
});
autoUpdater.on("update-downloaded", () => {
  logger.log("update downloaded");
});
autoUpdater.on("download-progress", (progress) => {
  logger.log(progress);
});
