// Edit these defaults anytime
const PANE_DEFAULTS = [
  "https://www.youtube.com/",
  "https://www.tiktok.com/",
  "https://www.instagram.com/",
  "https://www.youtube.com/"
];

const grid = document.getElementById("grid");

function normalizeUrl(s, fallback) {
  const t = String(s || "").trim();
  if (!t) return fallback;
  if (!/^https?:\/\//i.test(t)) return `https://${t}`;
  return t;
}

// ---- persistence ----
function loadJson(key) {
  try { return JSON.parse(localStorage.getItem(key) || "null"); }
  catch { return null; }
}
function saveJson(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}
function loadPaneUrl(i) {
  const st = loadJson("quad_state") || {};
  return st[String(i)] || null;
}
function savePaneUrl(i, url) {
  const st = loadJson("quad_state") || {};
  st[String(i)] = url;
  saveJson("quad_state", st);
}

function makePane(i) {
  const homeUrl = PANE_DEFAULTS[i - 1] || "https://www.youtube.com/";

  const pane = document.createElement("section");
  pane.className = "pane";

  const bar = document.createElement("div");
  bar.className = "paneBar";

  const back = document.createElement("button");
  back.className = "mini";
  back.textContent = "←";

  const fwd = document.createElement("button");
  fwd.className = "mini";
  fwd.textContent = "→";

  const reload = document.createElement("button");
  reload.className = "mini";
  reload.textContent = "⟳";

  const home = document.createElement("button");
  home.className = "mini";
  home.textContent = "Home";

  const external = document.createElement("button");
  external.className = "mini";
  external.textContent = "↗";

  const addr = document.createElement("input");
  addr.className = "addr";
  addr.placeholder = "Type URL and press Enter";

  const webview = document.createElement("webview");
  webview.setAttribute("allowpopups", "true");

  const last = loadPaneUrl(i);
  const startUrl = last || homeUrl;

  addr.value = startUrl;
  webview.setAttribute("src", startUrl);

  // Update addr as user navigates
  webview.addEventListener("did-navigate", (e) => {
    addr.value = e.url;
    savePaneUrl(i, e.url);
  });
  webview.addEventListener("did-navigate-in-page", (e) => {
    addr.value = e.url;
    savePaneUrl(i, e.url);
  });

  back.onclick = () => { try { if (webview.canGoBack()) webview.goBack(); } catch {} };
  fwd.onclick  = () => { try { if (webview.canGoForward()) webview.goForward(); } catch {} };
  reload.onclick = () => webview.reload();
  home.onclick   = () => webview.loadURL(homeUrl);
  external.onclick = () => window.app.openExternal(addr.value || startUrl);

  addr.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") {
      const url = normalizeUrl(addr.value, homeUrl);
      webview.loadURL(url);
    }
  });

  bar.append(back, fwd, reload, home, external, addr);
  pane.append(bar, webview);

  grid.appendChild(pane);

  return { webview, homeUrl };
}

// Build 4 panes
const panes = [];
for (let i = 1; i <= 4; i++) panes.push(makePane(i));

// Global controls
document.getElementById("homeAll").onclick = () => {
  panes.forEach(p => p.webview.loadURL(p.homeUrl));
};

document.getElementById("reloadAll").onclick = () => {
  panes.forEach(p => p.webview.reload());
};

// Mute/unmute best-effort (works for pages with <video>)
function setMuteAll(muted) {
  panes.forEach(p => {
    p.webview.executeJavaScript(`
      (function(){
        const v = document.querySelector('video');
        if (v) { v.muted = ${muted ? "true" : "false"}; return true; }
        return false;
      })();
    `).catch(() => {});
  });
}
document.getElementById("muteAll").onclick = () => setMuteAll(true);
document.getElementById("unmuteAll").onclick = () => setMuteAll(false);

// Bottom quick links
document.querySelectorAll(".linkBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const url = btn.getAttribute("data-url");
    window.app.openExternal(url);
  });
});

// Open any URL from input
const openUrlInput = document.getElementById("openUrl");
const openUrlBtn = document.getElementById("openUrlBtn");

function openFromInput() {
  const url = normalizeUrl(openUrlInput.value, "https://www.google.com/");
  window.app.openExternal(url);
}

openUrlInput.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") openFromInput();
});
openUrlBtn.onclick = openFromInput;
