const { app, BrowserWindow, Notification } = require('electron');
var sudo = require('sudo-prompt');
const { svc } = require('./utils');
const { join } = require('path');

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

const scriptPath = join(__dirname, 'mac-deamon.js');


function showNotification () {
  const notification = {
    title: 'Basic Notification',
    body: JSON.stringify()
  }
  new Notification(notification).show()
}

const options = {
  name: 'Electron deamon hello'
};

app.whenReady().then(() => {
    try{
        console.log('DEAMON STATUS====',svc.exists)
        if (!svc.exists) {
          const cmd = `ELECTRON_RUN_AS_NODE=1 ${process.execPath} ${scriptPath}`;
          console.log(`launch command======${cmd}`)
          sudo.exec(cmd, options,
            function(error, stdout, stderr) {
                if (error) console.log('sudoprompt error', error, stderr);
                console.log('stdout: ' + stdout);
            }
          );
        }
    }catch(e){
        console.log('DEAMON ERROR',e)
    }
    createWindow();
}).then(showNotification)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})