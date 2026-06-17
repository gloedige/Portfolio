# Portfolio — Gerd Lödige

A bilingual (English / German) personal portfolio website showcasing projects, skills, and a contact form.

---

## Table of Contents

1. [Demo](#demo)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [How to Navigate](#how-to-navigate)
5. [Controls](#controls)
6. [File Structure](#file-structure)
7. [Technologies](#technologies)
8. [License](#license)

---

## Demo

Open `index.html` in any modern browser — it auto-detects your browser language and redirects to either `en/index.html` or `de/index.html`.

A live version is hosted on GitHub Pages (or your preferred host).

---

## Requirements

- A modern browser (Chrome, Firefox, Edge, Safari — any version from the last two years)
- No build tools, bundlers, or package managers required

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/gloedige/Portfolio.git

# 2. Navigate into the project folder
cd Portfolio

# 3. Open the entry point
#    Double-click index.html  — or —
#    serve it with a local dev server to avoid cross-origin restrictions
#    (e.g. VS Code Live Server, Python's built-in server, or npx serve)
python3 -m http.server 8080
# then visit http://localhost:8080
```

> **Tip:** Some browsers block PHP mail submission (`send_mail.php`) and certain asset requests when files are opened directly from the file system. Use a local server for full functionality.

---

## How to Navigate

The portfolio is a single-page application divided into five sections:

| Section | Description |
|---------|-------------|
| **Hero** | Introduction and quick-access social links |
| **Why Me** | Animated typing card with location / remote / relocation info |
| **Skills** | Technology icons with hover effects |
| **Projects** | Interactive project browser (Pokedex, El Pollo Loco, Join, Ongoing) |
| **Contact** | Validated contact form that submits via PHP mail |

Click any navigation link (top nav or burger menu on mobile) to jump to the corresponding section.

---

## Controls

### Desktop

| Action | Control |
|--------|---------|
| Jump to section | Click nav link in the top navigation bar |
| Open project detail | Click a project button in the Projects section |
| Submit contact form | Fill in all fields and click **Send** |
| Switch language | Click **DE** or **EN** in the navigation |

### Mobile

| Action | Control |
|--------|---------|
| Open navigation | Tap the ☰ burger button (top-right) |
| Jump to section | Tap a link inside the burger menu |
| Scroll to top | Tap the ↑ arrow at the bottom of any section |

---

## File Structure

```
Portfolio/
├── index.html                   # Entry point — detects language and redirects
├── script.js                    # Core JS: language detection, typing animation
├── style.css                    # Main stylesheet
├── send_mail.php                # Server-side PHP mailer
├── php.ini                      # PHP configuration (e.g. mail settings)
├── LICENSE                      # MIT License
│
├── en/                          # English pages
│   ├── index.html               # English main page
│   ├── legal_notice.html        # Impressum
│   └── privacy_policy.html      # Privacy policy
│
├── de/                          # German pages
│   ├── index.html               # German main page
│   ├── legal_notice.html        # Impressum (DE)
│   └── privacy_policy.html      # Datenschutzerklärung
│
├── styles/                      # Modular CSS files
│   ├── animation.css            # Keyframe animations and transitions
│   ├── burger.css               # Burger / mobile navigation styles
│   ├── legal_notice.css         # Styles for legal pages
│   └── responsive.css           # Media queries for responsive layout
│
├── scripts/                     # Modular JS files
│   ├── animate_project_overview.js  # Project section slide/fade logic
│   ├── check_input.js               # Contact form validation
│   ├── intersection_observer.js     # Scroll-triggered animations
│   └── submit_mail.js               # Async form submission
│
└── assets/
    ├── fonts/                   # Custom web fonts (Anta, Josefin Sans)
    ├── icons/                   # SVG and PNG UI icons
    └── img/                     # Profile photo, project thumbnails, backgrounds
```

---

## Technologies

| Technology | Usage |
|-----------|-------|
| **HTML5** | Semantic page structure, bilingual page templates |
| **CSS3** | Flexbox layout, CSS custom properties, keyframe animations, media queries |
| **Vanilla JavaScript (ES6+)** | Language detection, typing animation, intersection observer, form validation, async fetch |
| **PHP** | Server-side email submission via `send_mail.php` |

No frameworks, no bundlers — zero dependencies.

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.