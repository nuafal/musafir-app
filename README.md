# 🚗 Musafir Calculator App

A location-aware, containerized web application designed to calculate driving distances and determine eligibility for Jamak/Qasar prayers based on the 2 Marhalah (~82km) threshold in Malaysia.

## 🏗️ Architecture & Tech Stack
* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Backend:** Node.js, Express.js
* **APIs:** Google Maps Distance Matrix API, Google Places Autocomplete API, HTML5 Geolocation API
* **Infrastructure:** Docker, AWS EC2 (Ubuntu), Ngrok
* **Security:** Backend API key injection (hiding keys from the client-side), `.env` environment variables.

## ✨ Key Features
* **📍 GPS Auto-Detect:** Uses the browser's native geolocation API to pinpoint the user's exact starting coordinates.
* **🔍 Smart Autocomplete:** Integrates Google Places to auto-suggest highly accurate destination addresses within Malaysia.
* **🛣️ True Routing Math:** Calculates actual *driving distance* rather than straight-line radius to ensure accurate Islamic rulings.
* **🛡️ Secure Frontend:** Dynamically injects Google Maps API keys from the backend to prevent credential scraping on GitHub.

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/nuafal/musafir-app.git](https://github.com/nuafal/musafir-app.git)
   cd musafir-app
