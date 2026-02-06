# cursor_chaicode

A small static UI demo showcasing custom cursor styles, layout examples, and a simple gallery. This repository contains a single-page static site (HTML/CSS/JS) intended as a lightweight front-end exercise and reference for cursor interactions and layout techniques.

## Demo / Preview

Open `index.html` in your browser to see the demo. The `images/` directory includes preview assets used by the page.

## Features

- Custom cursor visuals and interactions
- Responsive layout examples (flexbox)
- Simple image gallery and icon assets
- Minimal HTML/CSS/JS — easy to read and modify

## Project structure

```
index.html
README.md
css/
	style.css       # main styles for the demo
images/           # image assets used in the demo
script/
	app.js          # interactive behaviour for the demo
```

## Local development / Running

Because this is a static site, there are three easy ways to run it locally:

1) Open `index.html` directly in your browser (double-click or `File → Open`).

2) Start a simple HTTP server (recommended to avoid CORS or file URL edge cases):

```bash
# macOS / zsh
cd /Users/joshi/Desktop/cohort/cursor-ui
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

3) Use VS Code Live Server extension — right-click `index.html` and choose "Open with Live Server".

Optional (Node):

```bash
# if you have `serve` installed (npm i -g serve)
serve .
```

## Editing

- Styles: `css/style.css`
- Scripts: `script/app.js`
- HTML markup: `index.html`

Make small changes and refresh the browser to see updates.

## Testing / Smoke checks

- Open the browser DevTools (Cmd+Option+I) and check the console for errors.
- Resize the window to verify responsive behavior.

## Contributing

Contributions are welcome. For small changes (typos, styling tweaks, small features):

1. Fork the repo
2. Create a branch for your change
3. Open a pull request describing what you changed and why

If you'd like help picking a small issue to start with, open an issue describing what you'd like to do.

## License

This project is provided under the MIT License. See `LICENSE` (if present) or add one when you want to publish.

## Author

Repository: `cursor_chaicode` — maintained by bhupeshjoshi119

---
Small, focused demo — enjoy exploring and customizing the cursor UI and layout examples.
