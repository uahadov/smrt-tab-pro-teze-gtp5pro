# 🚀 Smart Tab Pro — Intelligent & Fully Customizable New Tab Dashboard

<p align="center">
  <img src="icons/icon128.png" alt="Smart Tab Pro Logo" width="100"/>
</p>

<p align="center">
  <strong>Transform every new browser tab into your personalized productivity hub and live command center.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Manifest-V3-blue?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Manifest V3">
  <img src="https://img.shields.io/badge/Platform-Chromium%20%7C%20Chrome%20%7C%20Edge%20%7C%20Brave-success?style=for-the-badge" alt="Chromium">
  <img src="https://img.shields.io/badge/Privacy-100%25%20Local%20Storage-brightgreen?style=for-the-badge" alt="Privacy First">
  <img src="https://img.shields.io/badge/Version-v3.0%20Stable-orange?style=for-the-badge" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge" alt="License">
</p>

---

## 📌 What is Smart Tab Pro?

**Smart Tab Pro** is a modern, privacy-focused **New Tab extension** designed for Chromium-based browsers (Google Chrome, Microsoft Edge, Brave, Opera, etc.).

Instead of opening a blank, uninspiring page every time you press `Ctrl+T`, Smart Tab Pro gives you an elegant, interactive dashboard tailored for peak daily productivity:

* **Freeform Layout (Drag & Drop + Resize):** Move, reposition, and resize any widget anywhere on your screen.
* **Instant AI & Social Switcher:** Jump straight to leading AI tools (ChatGPT, Gemini, Copilot, DeepSeek, Meta AI) or social networks with a single click.
* **Built-in Focus Suite:** Stay in the zone with an integrated Pomodoro timer, simple To-Do checklist, and fast scratchpad notes.
* **Live Market & Information Feeds:** Track crypto prices, stock & currency rates, local weather, and news headlines in real time.
* **100% Private & Offline-First:** Everything stays safely stored in your browser's local storage. Zero third-party telemetry, zero tracking.

---

## ✨ Key Features

### 📐 1. Freeform Layout Engine (Drag & Drop + Resize)
* **Custom Positioning:** Click the **📐 Layout Mode** button in the top-left corner to unlock the canvas. Drag any widget anywhere you want.
* **Corner Resizing:** Grab the bottom-right corner handles to adjust widget dimensions to match your display resolution and personal taste.
* **Persistent State:** All positions and dimensions save automatically to browser storage. One-click layout reset is available at any time.

### 🤖 2. Fast AI & Social Media Dock
* Toggle seamlessly between your most-used platforms with the bottom **"AI"** switch:
  * **AI Assistants:** ChatGPT, Google Gemini, Microsoft Copilot, DeepSeek, and Meta AI.
  * **Social & Communication:** YouTube, Instagram, Gmail, Telegram, WhatsApp, and X (Twitter).
* **Custom Shortcuts:** Easily bookmark your own favourite websites, customize categories, and remove or hide unused default links.

### 🍅 3. Built-in Productivity Suite
* **Pomodoro Timer:** Configurable work & break cycles (default 25m work / 5m break) with auditory completion chimes.
* **Interactive To-Do List:** Jot down priority tasks, mark them complete, and clean up finished items with ease.
* **Quick Scratchpad:** Auto-saving notes area for temporary thoughts, copy-pasting snippets, or phone numbers.

### 📈 4. Live Market Data & Real-Time Widgets
* **Crypto Tracker:** Real-time prices and 24h percentage changes powered by the CoinGecko API (Bitcoin, Ethereum, Solana, and 50+ coins). Add or remove coins dynamically.
* **Currencies & Global Equities:** Live exchange rates (USD/TRY, EUR/TRY, GBP/TRY) and major stock indicators (Apple, Microsoft, Nvidia, Tesla, and more).
* **Live Weather & Geolocation:** Automatic location lookup via OpenStreetMap and instant temperature/humidity via OpenWeatherMap.
* **News & Daily Inspiration:** Live RSS feeds for breaking headlines and daily handpicked motivational quotes.
* **Central Google Search:** Instant search bar right in the center for distraction-free queries.

### 🎨 5. Personalization & Theming
* **Curated Color Themes:** Dark, Light, Sunset, Ocean, Forest, and Purple.
* **Custom Color Picker:** Set your own accent gradient to match your wallpaper and setup.
* **Custom Wallpaper Upload:** Upload any personal photo or background image directly from your local drive.
* **Animation & Audio Controls:** Toggle UI transitions and timer sounds on or off based on your preference.

### 🔒 6. Privacy & Data Portability
* **No Cloud Account Required:** Works entirely client-side using `chrome.storage.local`.
* **Backup & Restore (JSON Export/Import):** Export your custom widgets, shortcuts, notes, and layout to a single `.json` file and restore it on any machine in seconds.

---

## 📥 Quick Installation Guide (Unpacked Extension)

You can install and run Smart Tab Pro in under 60 seconds without publishing to the Chrome Web Store:

1. **Download the Code:**
   * Click **Code -> Download ZIP** on GitHub and extract the folder to your computer (or run `git clone https://github.com/uahadov/smart-tab-extension.git`).
2. **Open Extensions Page in your browser:**
   * **Chrome:** `chrome://extensions/`
   * **Edge:** `edge://extensions/`
   * **Brave:** `brave://extensions/`
3. **Enable Developer Mode:**
   * Switch on the **"Developer mode"** toggle in the top-right corner.
4. **Load the Extension:**
   * Click the **"Load unpacked"** button in the top-left corner.
   * Select the extracted folder containing `manifest.json`.
5. **Enjoy!** Open a new tab (`Ctrl + T` or `Cmd + T`) to see your brand-new dashboard.

---

## 🛠️ Usage & Tips

| Icon / Action | What it does |
| :--- | :--- |
| **⚙️ Gear Icon (Top-Right)** | Opens the settings panel to toggle widgets, change themes, manage tracked cryptos/stocks, and export backup files. |
| **📐 Ruler Icon (Top-Left)** | Enables freeform Drag & Drop and Resizing mode for all widgets. |
| **🤖 "AI" Button (Bottom)** | Toggles the bottom dock between AI assistants and Social media channels. |
| **🔍 Search Bar (Center)** | Type any query and hit `Enter` to search directly on Google. |

---

## 💻 Tech Stack

* **Front-end:** Vanilla JavaScript (ES6+), HTML5, CSS3 (Modern Flexbox, CSS Grid, Custom Properties).
* **Extension Platform:** Chrome Extensions API — **Manifest V3** (`chrome.storage.local`, `chrome_url_overrides`).
* **External APIs:**
  * [CoinGecko API](https://www.coingecko.com/) — Real-time cryptocurrency prices.
  * [ExchangeRate API](https://www.exchangerate-api.com/) — Fiat currency conversion rates.
  * [OpenWeatherMap API](https://openweathermap.org/) — Local weather reports.
  * [OpenStreetMap Nominatim](https://nominatim.openstreetmap.org/) — Reverse geocoding for city & country.
  * [RSS2JSON API](https://rss2json.com/) — RSS feed parsing for news.

---

## 📄 License

Distributed under the [MIT License](LICENSE). You are free to use, modify, and build upon this project.
