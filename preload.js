const { contextBridge, shell } = require("electron");

contextBridge.exposeInMainWorld("app", {
  openExternal: (url) => shell.openExternal(String(url || "")),
  version: () => "quad-viewer-oss"
});
