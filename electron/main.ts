import { app, BrowserWindow, ipcMain, session } from "electron";
import * as path from "path";
import * as os from "os";
import installExtension, {
	REACT_DEVELOPER_TOOLS,
} from "electron-devtools-installer";

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			// contextIsolation: false,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	if (app.isPackaged) {
		// 'build/index.html'
		win.loadURL(`file://${__dirname}/../`);
	} else {
		win.loadURL("http://localhost:3000/");

		win.webContents.openDevTools();

		// Hot Reloading on 'node_modules/.bin/electronPath'
		require("electron-reload")(__dirname, {
			electron: path.join(
				__dirname,
				"..",
				"..",
				"node_modules",
				".bin",
				"electron" + (process.platform === "win32" ? ".cmd" : "")
			),
			forceHardReset: true,
			hardResetMethod: "exit",
		});
	}
}

app.whenReady().then(async () => {
	// DevTools
	// const reactDevToolsPath = path.join(
	// 	os.homedir(),
	// 	"/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.27.7_11"
	// );
	// await session.defaultSession.loadExtension(reactDevToolsPath);
	// installExtension(REACT_DEVELOPER_TOOLS)
	// 	.then((name) => console.log(`Added Extension:  ${name}`))
	// 	.catch((err) => console.log("An error occurred: ", err));

	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});

	app.on("window-all-closed", () => {
		if (process.platform !== "darwin") {
			app.quit();
		}
	});
});
