'use strict';

import child from 'child_process';
import { app, protocol, BrowserWindow } from 'electron';
import {
  createProtocol,
} from 'vue-cli-plugin-electron-builder/lib';

const isDevelopment = process.env.NODE_ENV !== 'production';

let win: any;
protocol.registerSchemesAsPrivileged([ { scheme: 'app', privileges: { secure: true, standard: true } } ]);

function createWindow() {
  win = new BrowserWindow({
    width: 420,
    height: 570,
    webPreferences: {
      nodeIntegration: Boolean(process.env.ELECTRON_NODE_INTEGRATION)
    }
  });
  win.setMenuBarVisibility(false);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    win.loadURL('app://./index.html');
  }

  win.on('will-resize', (e: any) => {
    e.preventDefault();
  });

  win.webContents.on('did-finish-load', () => {
    import('./electron/webserver');
  });

  win.on('closed', () => {
    win = null;
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

app.on('ready', async () => {
  createWindow();
});

if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
