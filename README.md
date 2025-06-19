# Anime For You - Backend API

A comprehensive CRUD API for managing anime series, movies, and user suggestions using Node.js, Express, and MongoDB.

## 📁 Project Structure

```
animeforyoume_backend/
├── config/
│   └── database.js              # MongoDB connection
├── controllers/                 # Business logic (future use)
├── middleware/
│   ├── errorHandler.js         # Global error handling
│   └── requestLogger.js        # Request logging
├── models/
│   ├── AnimeList.js           # Anime series schema
│   ├── AnimeMoviesList.js     # Anime movies schema
│   └── AnimeSuggestion.js     # User suggestions schema
├── routes/
│   ├── anime/
│   │   ├── animeList.js       # Series CRUD routes
│   │   └── animeMoviesList.js # Movies CRUD routes
│   ├── suggestions/
│   │   └── animeSuggestions.js # Suggestions CRUD routes
│   ├── index.js               # Main routes organizer
│   └── getRoutes.js          # Legacy routes
├── .env                       # Environment variables
├── index.js                   # Main server file
├── seedDatabase.js           # Database seeding script
└── package.json
```

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Update the `.env` file with your MongoDB connection string:
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Anime4ume
```

### 3. Start the Server
For development (auto-restart on file changes):
```bash
npm run dev
```

For production:
```bash
npm start
```

### 4. Health Check
```bash
GET http://localhost:3000/api/health
```

## 📡 API Endpoints

### Base URL: `http://localhost:3000/api`

---

## 🎬 Anime Series (AnimeList)

### `GET /api/animeList`
Get all anime series
```json
{
  "success": true,
  "count": 25,
  "data": [...]
}
```

### `GET /api/animeList/:id`
Get anime series by ID

### `POST /api/animeList`
Add new anime series
```json
{
  "title": "Attack on Titan",
  "description": "Humanity fights against giant humanoid creatures...",
  "image": "/images/aot.jpg",
  "sourceUrl": "https://example.com/aot",
  "genres": ["Action", "Drama"],
  "status": "completed",
  "episodes": 87,
  "rating": 9.0
}
```

### `PUT /api/animeList/:id`
Update anime series

### `DELETE /api/animeList/:id`
Delete anime series

---

## 🎭 Anime Movies (AnimeMoviesList)

### `GET /api/animeMoviesList`
Get all anime movies
```json
{
  "success": true,
  "count": 15,
  "data": [...]
}
```

### `GET /api/animeMoviesList/:id`
Get anime movie by ID

### `POST /api/animeMoviesList`
Add new anime movie
```json
{
  "title": "Spirited Away",
  "description": "A girl enters a world ruled by spirits...",
  "image": "/images/spirited-away.jpg",
  "sourceUrl": "https://example.com/spirited-away",
  "genres": ["Adventure", "Family"],
  "duration": 125,
  "releaseYear": 2001,
  "rating": 9.3
}
```

### `PUT /api/animeMoviesList/:id`
Update anime movie

### `DELETE /api/animeMoviesList/:id`
Delete anime movie

---

## 💡 User Suggestions

### `GET /api/suggestions`
Get all suggestions with pagination
Query parameters:
- `status`: Filter by status (pending, reviewed, approved, rejected)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### `GET /api/suggestions/:id`
Get suggestion by ID

### `POST /api/suggestions`
Submit new anime suggestion
```json
{
  "email": "user@example.com",
  "animeName": "Demon Slayer",
  "animeReason": "Amazing animation and compelling story about family bonds"
}
```

### `PUT /api/suggestions/:id`
Update suggestion status (admin)
```json
{
  "status": "approved"
}
```

### `DELETE /api/suggestions/:id`
Delete suggestion

---

## 🔄 Legacy Routes (Backward Compatibility)

- `GET /anime/animeList` → `GET /api/animeList`
- `GET /anime/animeMoviesList` → `GET /api/animeMoviesList`
- `GET /anime/animeSuggestions` → `GET /api/suggestions`
- `POST /anime/animesuggestions` → `POST /api/suggestions`

---

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {...},
  "count": 10,
  "total": 100,
  "page": 1,
  "pages": 10
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": ["Validation error details..."]
}
```

---

## 🛠️ Development Features

- ✅ **Organized folder structure**
- ✅ **CRUD operations** for all entities
- ✅ **Input validation** and sanitization
- ✅ **Error handling** middleware
- ✅ **Request logging**
- ✅ **Pagination** support
- ✅ **Status filtering** for suggestions
- ✅ **Backward compatibility**
- ✅ **Health check endpoint**

---

## 🗄️ Database Collections

- **animedata**: All anime data (series + movies) - Legacy
- **animelists**: Anime series collection
- **animemovieslists**: Anime movies collection  
- **animesuggestions**: User suggestions collection

---

## 🔧 Scripts

```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
npm run seed     # Seed database with sample data
```
