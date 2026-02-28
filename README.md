# Portfolio

A fast, accessible, and modern portfolio website. Built with vanilla HTML, CSS, and JS so it is simple to customize and deploy anywhere.

## Structure

```
.
├── index.html
├── css/
│   └── styles.css
└── js/
    └── main.js
```

## Customize

- Edit your name, links, and content in `index.html`.
- Update projects in `js/main.js` inside the `projects` array.
- Adjust colors and spacing via CSS variables in `css/styles.css`.

## Develop

Open `index.html` directly in a browser, or use a simple server:

```bash
# Python 3
python -m http.server 5173

# or Node (if you have it)
npx serve -l 5173
```

Then visit `http://localhost:5173`.

## Deploy

- GitHub Pages: push this folder to a repo, then enable Pages on `main`.
- Netlify / Vercel: import the repo and deploy (no build step needed).
- Static hosting: upload the files to any static host.

## Accessibility & Performance

- Uses semantic HTML, visible focus styles, and reduced motion by default.
- No heavyweight frameworks; minimal JS; responsive out of the box.




