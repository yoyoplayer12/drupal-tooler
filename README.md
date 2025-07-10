# Drupal Tooler

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-brightgreen?logo=googlechrome&logoColor=white)](https://chromewebstore.google.com/detail/drupal-tooler/lmkfjgfjbplgkgkgfmkiepadaajpenkn)
[![Drupal.org](https://img.shields.io/badge/Drupal.org-Enhanced-blue?logo=drupal)](https://www.drupal.org/project/tooler)
[![License: MIT](https://img.shields.io/github/license/baikho/drupal-tooler)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/baikho/drupal-tooler)](https://github.com/baikho/drupal-tooler/commits/1.x)
[![Stars](https://img.shields.io/github/stars/baikho/drupal-tooler?style=social)](https://github.com/baikho/drupal-tooler/stargazers)

| ![Drupal Tooler Icon](https://github.com/user-attachments/assets/f190a29b-1eab-4007-9450-46f3245e0cc4) | A lightweight Chrome Extension that enhances Drupal.org issue pages with useful tools for developers. |
|------------------------------------|------------------------------------------------------------------------|

---

## ✅ Features

### 📦 Composer Patch Button

- Adds a **"Composer"** column to patch file tables on issue pages
- Generates a valid Composer patch entry like:

  ```json
  "drupal/[project_name]": {
    "#123456: Issue title": "https://www.drupal.org/files/issues/..."
  }
  ```

---

### 💬 Reply Button

- Adds a 💬 "Reply" icon button to each comment on issue pages. When clicked:
- Appends a permalink to the comment (e.g. `<a href="#comment-14937840">#13</a>`)

---

### 🛠 GitLab MR Patch Composer

- Detects GitLab merge requests in the issue fork block
- Creates a table showing:
  - MR number (e.g. `!8`)
  - Patch download link (`.patch`)
  - "Copy" button with Composer patch JSON

---

### 👀 Inline Patch Previews

Adds a "Preview" button next to each patch file on issue pages.

- Expands a full-width row below the patch row
- Fetches and displays patch contents inline
- Adds syntax highlighting:
  - ✅ Light green for added lines
  - ❌ Light red for removed lines
- Great for reviewing diffs without leaving the page

---

### 🏷 OP Comment Badging

Adds a small "OP" badge next to the username of the original poster on issue comments.

- Makes it easy to identify the person who opened the issue
- Clean, minimalist styling using Drupal brand color

---

### 🔍 Drupal Version Detection

Automatically detects and displays the Drupal version of any website you visit through the extension popup.

- **Smart Detection**: Uses multiple methods to identify Drupal sites:
  - Checks meta generator tags for version information
  - Looks for Drupal-specific CSS classes and body attributes
- **Popup Display**: Shows version information when you click the extension icon:
  - `Drupal 10` - Shows specific version when detected
  - `Drupal (version unknown)` - Confirms it's Drupal but version unclear
  - `Not a Drupal site` - When no Drupal installation is found
  - `Cannot access page` - When permissions prevent detection
- **Universal Compatibility**: Works on any website, not just Drupal.org
- **Instant Results**: Version detection happens immediately when popup opens

Perfect for developers who need to quickly identify Drupal versions across different sites during development, auditing, or troubleshooting.

---

## 📸 Screenshots

![Drupal Tooler](https://github.com/user-attachments/assets/9b232e4e-968a-4221-9895-b970f3f0e100)

---

## 🛠 Installation

Available on the [Chrome Web Store](https://chromewebstore.google.com/detail/drupal-tooler/lmkfjgfjbplgkgkgfmkiepadaajpenkn).

Or install manually:

1. Clone or download the repository
2. Visit `chrome://extensions` in your browser
3. Enable **Developer Mode**
4. Click **Load unpacked**
5. Select the project folder

---

## 📦 License

MIT — go wild and contribute back!
