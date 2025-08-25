# 🌌 AtlasMind - AI-Powered Travel Planner

A modern, dark-theme web application that generates intelligent travel itineraries using Gemini AI and Google Maps APIs.

## ✨ Features

- **AI Itinerary Generation**: Uses Gemini API with prompt chaining for personalized travel plans
- **Smart Route Optimization**: Python ML pipeline for clustering attractions and optimizing daily routes
- **Interactive Maps**: Google Maps integration for attractions, dining, and directions
- **Budget Optimization**: Intelligent budget allocation across activities and dining
- **Modern UI**: Dark theme with cyberpunk-inspired teal and purple accents
- **Export Options**: Download itineraries as PDF

## 🏗️ Architecture

- **Frontend**: React + TailwindCSS with dark theme
- **Backend**: Python FastAPI with ML pipeline
- **AI**: Google Gemini API with prompt chaining
- **Maps**: Google Maps API (Places, Directions, Embed)
- **Styling**: Modern cyberpunk aesthetic

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Google Cloud API keys (Gemini + Maps)

### Installation

1. **Clone and setup backend:**
```bash
cd backend
pip install -r requirements.txt
```

2. **Setup frontend:**
```bash
cd frontend
npm install
```

3. **Configure environment variables:**
```bash
# Backend (.env)
GEMINI_API_KEY=your_gemini_key
GOOGLE_MAPS_API_KEY=your_maps_key

# Frontend (.env)
REACT_APP_API_URL=http://localhost:8000
REACT_APP_GOOGLE_MAPS_KEY=your_maps_key
```

4. **Run the application:**
```bash
# Backend (Terminal 1)
cd backend
uvicorn main:app --reload

# Frontend (Terminal 2)
cd frontend
npm start
```

## 🔧 API Endpoints

- `POST /generate-itinerary`: Generate AI itinerary
- `GET /optimize-route`: Optimize daily routes
- `GET /export-pdf`: Export itinerary as PDF

## 🎨 Design System

- **Primary Colors**: Dark theme (#0f0f23, #1a1a2e)
- **Accents**: Teal (#00d4aa), Purple (#a855f7)
- **Typography**: Modern sans-serif with gradient text effects
- **Components**: Card-based layout with neon borders and shadows

## 🤖 AI Prompt Chaining

1. **Planner Prompt**: Generate raw day-by-day itinerary
2. **Refiner Prompt**: Convert to structured JSON with activities, maps, and dining

## 📱 Screenshots

*Coming soon - beautiful dark theme UI with interactive travel cards*

## 🚧 Development Status

- [x] Project structure
- [ ] Backend API
- [ ] Frontend UI
- [ ] AI integration
- [ ] Maps integration
- [ ] ML pipeline
- [ ] PDF export

## 📄 License

MIT License - feel free to use and modify!

