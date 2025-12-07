from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # allow requests from the Vite dev server

API_KEY = os.getenv("API_KEY")
BASE_URL = "https://api.weatherapi.com/v1"

@app.route("/weather")
def get_weather():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City is required"}), 400

    url = f"{BASE_URL}/current.json?key={API_KEY}&q={city}"
    response = requests.get(url).json()

    if "error" in response:
        return jsonify({"error": response["error"]["message"]}), 400

    current = response["current"]
    location = response["location"]

    result = {
        "location": location["name"],
        "region": location["region"],
        "country": location["country"],
        "condition": current["condition"]["text"],
        "temp_f": current["temp_f"],
        "feelslike_f": current["feelslike_f"],
        "wind_mph": current["wind_mph"],
        "humidity": current["humidity"],
        "last_updated": current["last_updated"]
    }

    return jsonify(result)

if __name__ == "__main__":
    print("🚀 Python Backend Running at http://localhost:5050")
    app.run(host="0.0.0.0", port=5050)
