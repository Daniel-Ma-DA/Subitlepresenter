const { app, BrowserWindow } = require('electron');

function createWindow()  {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        alwaysOnTop: true,            // Basis immer im Vordergrund
        transparent: true,            // Transparenter Hintergrund
        frame: false,                 // Keine native Fensterleiste
        resizable: true,              // Größe änderbar
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    // Alternative AlwaysOnTop-Level einstellen:
    win.setAlwaysOnTop(true, 'screen-saver');

    // Fenster auf allen Arbeitsflächen anzeigen (Multi-Monitor-Setup verbessern)
    win.setVisibleOnAllWorkspaces(true);

    // Fokusevent behandeln, um AlwaysOnTop erneut zu setzen
    win.on('focus', () => {
        win.setAlwaysOnTop(true, 'screen-saver');
    });

    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
