const { app , BrowserWindow } = require('electron')

let win;
 
function createWindow(){
    win = new BrowserWindow({
        width : 1280,
        height : 720,
        backgroundColor : '#ffffff',
        icon : `file://${__dirname}/dist/logo.png`,
        webPreferences: {
            enableRemoteModule: false
        }
    })

    win.loadURL(`file://${__dirname}/dist/monastery/index.html`)

    //dev
    win.webContents.openDevTools()

    win.on('closed' , function(){
        win = null 
    })
}

app.on('ready' , createWindow)

app.on('all-window-all-closed' , function (){
    if(process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate' , function(){
    if(win === null)
        createWindow()
})

