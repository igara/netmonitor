// Native
import { join } from 'path'
import { format } from 'url'

// Packages
import * as electron from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'
import psList from 'ps-list'
import * as frida from 'frida'

// Prepare the renderer once the app is ready
electron.app.on('ready', async () => {
  await prepareNext('./renderer')

  const mainWindow = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      preload: join(__dirname, 'preload.js'),
    },
  })

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
        pathname: join(__dirname, '../renderer/out/index.html'),
        protocol: 'file:',
        slashes: true,
      })

  mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
electron.app.on('window-all-closed', electron.app.quit)

electron.ipcMain.on('StartNetworkAPIHook', async(event) => {
  const processes = await psList()
  processes.forEach(async p => {
    if (p.name === 'chrome.exe') {
      console.log(p)
      const session = await frida.attach(p.pid)
      console.log(session)
    }
  });

  event.sender.send('StartNetworkAPIHook', 'aaaaa')
});
