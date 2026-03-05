# Quad Viewer – Multi-Stream Research Workspace

Quad Viewer is a lightweight local Electron application that allows users to view **four different web streams simultaneously** inside one workspace.

It was designed to reduce context switching when monitoring multiple sources such as video streams, social platforms, and research tools.

The layout automatically adjusts so each window remains visible and usable.

---

## Screenshot

![quad-viewer](https://github.com/user-attachments/assets/e4b38e41-dafd-4fcf-ba29-29e60b54f15f)


---

## Why This Project Exists

When researching or monitoring multiple information sources, the biggest problem is **tab chaos**.

Users constantly switch between tabs or windows, losing focus and time.

Quad Viewer creates a **single workspace layout** where multiple sources can be observed simultaneously.

This can be useful for:

• market research  
• open-source intelligence style research  
• monitoring multiple video streams  
• following breaking news or events  
• comparing content across platforms  

The goal is **focus and visibility**, not automation or scraping.

---

## Features

• Four independent browser panes  
• Automatic layout resizing when the window changes size  
• Navigation controls for each pane  
• Quick access links for AI tools  
• Bottom workspace bar for additional browsing  
• Opens external links in your default browser  
• Lightweight Electron desktop application  

---

## Workspace Layout

Top section contains **four dynamic panes**.

Each pane can open any website including:



• YouTube  
• TikTok  
• Instagram  
• news platforms  
• research sites  

The bottom section provides quick access buttons to open tools such as:

• ChatGPT  
• xAI  
• Gemini  
• Google search  

These open using your **own browser login session**.

No API keys are required.

---

## Installation

Make sure Node.js is installed.

Check with:

```bash
node -v
npm -v



Clone the Repository
git clone https://github.com/0xDL01/quad-viewer.git
cd quad-viewer

Install Dependencies
npm install

Run the Application
npm start

The Quad Viewer workspace will open.
