# Mood Board App

This is a full-stack mood tracking application designed for teams and coaches.  
Players submit their mood daily, and coaches monitor team sentiment via a live dashboard.

Built with:

- Frontend: React + TailwindCSS
- Backend: PHP (Slim) + SQLite

## Prerequisites

Make sure you have the following installed on your machine:

### Backend

- PHP ^8.0
- Composer
- SQLite (usually bundled with PHP)

### 💻 Frontend

- Node.js (v16+ recommended)
- npm or yarn

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Dara-codes/mood-board-app.git
cd mood-board-app


### Backend Setup
-cd backend
-composer install
-php setup_db.php
-php -S localhost:8000 -t public
-This will start the backend server on http://localhost:8000

## Frontend Setup

-cd frontend
-npm install
-npm start
-This will start the React app on http://localhost:3000

## Environment Configs & API URL Setup
To ensure your frontend connects properly to your backend (especially if you deploy or change ports), let’s make it dynamic using environment variables.

## Frontend Environment Variable Setup
In your frontend/ folder:

Create a file named .env (if it doesn’t already exist).

Add this line:
REACT_APP_API_BASE_URL=http://localhost:8000

Update Axios Base URL
In your frontend/src/utils/api.js, update your Axios instance like this:

###
 Update Axios Base URL
In your frontend/src/utils/api.js, update your Axios instance like this:

# import axios from 'axios';

# const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

# export const getMoods = async (date = null) => {
#   const url = date ? `${API_BASE_URL}/moods?date=${date}` : `${API_BASE_URL}/moods`;
#   const response = await axios.get(url);
#   return response.data;
# };

# export const postMood = async (emoji) => {
#   const response = await axios.post(`${API_BASE_URL}/mood`, { emoji });
#   return response.data;
# };

You can now:

Run the frontend with npm start

Send moods from Player View

View mood summaries in Coach View

CORS Setup for Backend
If your frontend (on localhost:3000) makes requests to your backend (on localhost:8000), and you get CORS errors in the browser, this step ensures proper access.
```
