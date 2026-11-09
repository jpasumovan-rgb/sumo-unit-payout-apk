// SUMO Unit Payout - Windows desktop app (SUMOVAN LOGISTICS CORP.)
// Opens the live Unit Payout web app in its own window and hides Google's
// "This application was created by a Google Apps Script user" banner.
// If the Apps Script /exec link ever changes, edit ONLY the APP_URL line.
const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');

const APP_URL = 'https://script.google.com/macros/s/AKfycbyJmT2m_5CJhRr0mJjPlkO5zA5zyay3azJPV85ElchPbsxM3ibTHAE-erlRQ9CRTtGp/exec';
const HIDE_BANNER = '#warning,.warning-bar{display:none!important}';
const INSIDE = /^https:\/\/([a-z0-9-]+\.)*(google\.com|googleusercontent\.com|gstatic\.com|googleapis\.com)(\/|$)/i;

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1240, height: 880, minWidth: 380, minHeight: 600,
    title: 'SUMO Unit Payout', icon: path.join(__dirname, 'icon.png'),
    backgroundColor: '#F4F5F1', autoHideMenuBar: true, show: false,
    webPreferences: { contextIsolation: true, sandbox: true }
  });
  const hide = () => {
    try { if (/^https:\/\/script\.google\.com\//.test(win.webContents.getURL())) win.webContents.insertCSS(HIDE_BANNER); } catch (e) {}
  };
  win.webContents.on('dom-ready', hide);
  win.webContents.on('did-navigate', hide);
  win.once('ready-to-show', () => win.show());
  win.on('page-title-updated', (e) => { e.preventDefault(); win.setTitle('SUMO Unit Payout'); });

  // Links outside Google (GitHub, websites) open in the normal browser.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (INSIDE.test(url)) return { action: 'allow' };
    shell.openExternal(url); return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (!INSIDE.test(url)) { e.preventDefault(); shell.openExternal(url); }
  });

  // No internet: show a simple retry page instead of a blank window.
  win.webContents.on('did-fail-load', (e, code, desc, url, isMain) => {
    if (!isMain || code === -3) return;
    win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(
      '<body style="font-family:Segoe UI,sans-serif;background:#F4F5F1;color:#17202A;display:flex;align-items:center;justify-content:center;height:100vh;margin:0">' +
      '<div style="text-align:center"><h2>No internet connection</h2><p>Check your Wi-Fi or mobile data, then try again.</p>' +
      '<button onclick="location.href=\'' + APP_URL + '\'" style="font-size:16px;padding:10px 22px;border:0;border-radius:8px;background:#CE2127;color:#fff;cursor:pointer">Try again</button></div></body>'));
  });

  win.loadURL(APP_URL);
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
  app.whenReady().then(() => {
    Menu.setApplicationMenu(Menu.buildFromTemplate([
      { label: 'App', submenu: [
        { label: 'Reload', accelerator: 'F5', click: () => win && win.loadURL(APP_URL) },
        { role: 'zoomIn' }, { role: 'zoomOut' }, { role: 'resetZoom' },
        { type: 'separator' }, { role: 'quit' } ] },
      { role: 'editMenu' }
    ]));
    createWindow();
  });
  app.on('window-all-closed', () => app.quit());
}
