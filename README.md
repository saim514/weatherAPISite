# Weather App (Flask + Vite)

Simple weather lookup that calls WeatherAPI through a Flask backend and shows results in a Vite/Vanilla JS frontend. Deployed backend/frontend live at:
- Backend: `https://saimsweather.onrender.com`
- Frontend: update `client/src/main.js` or `VITE_API_URL` to point there when building.

## Local setup

### Backend
1) `cd weather-mvp/backend`
2) `python3 -m venv venv && source venv/bin/activate`
3) `pip install -r requirements.txt`
4) Create `.env` with `API_KEY=your_weatherapi_key`
5) `python server.py` (runs on port 5050)

### Frontend
1) `cd weather-mvp/client`
2) `npm install`
3) `npm run dev` (opens on port 5173)
4) If backend port changes, edit `client/src/main.js` `BACKEND_PORT` or set `VITE_API_URL` and use it in fetch.

## Deploy to Render (backend)
- Service type: Web Service
- Root: `weather-mvp/backend`
- Build Command: `pip install -r requirements.txt`
- Start Command: `gunicorn server:app --bind 0.0.0.0:$PORT`
- Env vars: `API_KEY`, optional `PYTHON_VERSION=3.11`

## Deploy to Render (static frontend)
- Service type: Static Site
- Root: `weather-mvp/client`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Env vars: `VITE_API_URL=https://saimsweather.onrender.com`

## API endpoint
- `GET /weather?city=<city_or_zip>` returns current conditions in imperial units.

## Notes
- CORS is enabled on the Flask app for local dev.
- Keep `.env` out of version control (covered by `.gitignore`).
