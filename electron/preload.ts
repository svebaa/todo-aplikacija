import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
	createEditWindow: () => {
		console.log("calling");
		ipcRenderer.invoke("create-edit-window");
	},
});
