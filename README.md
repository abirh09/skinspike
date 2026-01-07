# SkinSpike - CS2 Market Price Tracker

<p align="center">
  <img src="public/logo.png" alt="SkinSpike Logo" width="128"/>
</p>


---

## Overview

**SkinSpike** is a web application that tracks and displays **recent price fluctuations** for Counter-Strike 2 (CS2) skins and collectibles on the Steam Community Market. The platform fetches historical and updated price data at regular intervals using **Appwrite functions** and presents it in a clean, intuitive interface.  

SkinSpike helps enthusiasts and traders observe notable price surges or crashes, analyze trends, and explore item histories—all in a visually responsive web app.

---

## Key Features

- **Price Updates**: Fetches CS2 item prices using **Appwrite serverless functions**.
- **Price Change Indicators**: Highlights items experiencing significant surges or crashes.
- **Filtering & Pagination**: Filter by `all`, `surge`, or `crash` and browse paginated results.
- **Responsive Design**: Mobile-friendly layout with a hamburger menu for easy navigation.
- **Informational Pages**: Includes About and Contact pages with disclaimers.
- **Error Handling**: Gracefully handles loading states and when no items are detected.

---

## Technologies Used

- **Frontend**: Next.js (React framework for SSR & static site generation)  
- **Backend / Data Fetching**: Appwrite Functions for retrieving Steam Market data  
- **Styling & UI**: Tailwind CSS, Lucide React icons  
- **State Management**: React Hooks  
- **Deployment**: Vercel for hosting and automatic builds  

---

## Deployment

The live application is hosted on **Vercel**:  

[🌐 SkinSpike Live Demo](https://www.skinspike.com/)

---

## Installation & Local Setup

To run SkinSpike locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/abirh09/skinspike.git

2. Install dependencies:
   ```bash
   npm install

3. Start the development server:
   ```bash
   npm run dev

4. Open http://localhost:3000 in your browser.
