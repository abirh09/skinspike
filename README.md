# SkinSpike - CS2 Steam Market Price Tracker

![SkinSpike Logo](public/logo.png)

---

## Overview

**SkinSpike** is a web application that tracks and displays **recent price fluctuations** for Counter-Strike 2 (CS2) skins and collectibles on the Steam Community Market. The platform fetches historical and updated price data at regular intervals using **Appwrite functions** and presents it in a clean, intuitive interface.  

SkinSpike helps enthusiasts and traders observe notable price surges or crashes, analyze trends, and explore item histories—all in a visually responsive web app.

This project is a personal initiative to explore **full-stack development**, **serverless data fetching**, and **modern UI/UX design**.

---

## Key Features

- **Price Updates**: Fetches CS2 item prices using **Appwrite serverless functions**.
- **Price Change Indicators**: Highlights items experiencing significant surges or crashes.
- **Item Details**: Shows item name, old/current prices, percentage change, detection time, and a direct link to the Steam Market.
- **Filtering & Pagination**: Filter by `all`, `surge`, or `crash` and browse paginated results.
- **Responsive Design**: Mobile-friendly layout with a hamburger menu for easy navigation.
- **Informational Pages**: Includes About and Contact pages with disclaimers.
- **Error Handling**: Gracefully handles loading states and when no items are detected.

> ⚠️ Note: SkinSpike **does not provide real-time alerts**. Prices are periodically updated using Appwrite functions and reflect snapshots of the Steam Market.

---

## Technologies Used

- **Frontend**: Next.js (React framework for SSR & static site generation)  
- **Backend / Data Fetching**: Appwrite Functions for retrieving Steam Market data  
- **Styling & UI**: Tailwind CSS, Lucide React icons  
- **State Management**: React Hooks  
- **Deployment**: Vercel for hosting and automatic builds  
- **Other**: JavaScript (ES6+), Fetch API  

---

## How It Works

1. **Data Collection**: Appwrite functions fetch market prices at scheduled intervals.  
2. **Data Storage**: Historical price snapshots are stored in Appwrite database documents.  
3. **Frontend Rendering**: Next.js app fetches data from Appwrite endpoints and displays items with visual indicators for price changes.  
4. **Filtering & Pagination**: Users can filter by price surge, crash, or view all, and navigate through pages of items.

---

## Deployment

The live application is hosted on **Vercel**:  

[🌐 SkinSpike Live Demo](https://skinspike.vercel.app/)

---

## Installation & Local Setup

To run SkinSpike locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/skinspike.git

2. Install dependencies:
   ```bash
   npm install

3. Start the development server:
   ```bash
   npm run dev

4. Open http://localhost:3000 in your browser.
