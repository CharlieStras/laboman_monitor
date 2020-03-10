const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const configPath = "./resources/config.json";
const adapter = new FileSync(configPath);
const config = low(adapter);

const sqlanywhere = require("sqlanywhere");
var conn_params = require("./secret");

if (fs.existsSync(configPath)) {
  config.read();
  var dbPath = config.get("dbPath").value();
  if (dbPath) {
    conn_params.DatabaseFile = dbPath;
  }
}

const conn = sqlanywhere.createConnection();

if (conn_params && process.env.NODE_ENV != "development") {
  conn.connect(conn_params, function(err) {
    if (err) console.error(err);
  });
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({ backgroundColor: "#0565be", show: false });

  var watcher;
  if (process.env.NODE_ENV == "development") {
    watcher = require("chokidar").watch(
      path.join(__dirname, "../public/build/bundle.js"),
      { ignoreInitial: true }
    );
    watcher.on("change", () => {
      mainWindow.reload();
    });
  }

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../public/index.html"));

  mainWindow.maximize();
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
    if (watcher) {
      watcher.close();
    }
    if (conn.connected()) {
      conn.disconnect();
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
exports.conn = conn;
