const electron = require('electron')


const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

app.on('ready', _ => {
	mainWindow = new BrowserWindow({
		height: 400,
		width: 600,
    resizable: false
	})

	mainWindow.loadURL(`file://${__dirname}/app.html`)

	mainWindow.on('closed', _ => {
		mainWindow = null
	})

})
