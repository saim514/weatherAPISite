const input = document.getElementById("cityInput");
const button = document.getElementById("fetchBtn");
const output = document.getElementById("weather");

button.addEventListener("click", fetchWeather);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchWeather();
  }
});

// ⚠️ IMPORTANT: update if you change the port in backend/server.py
const BACKEND_PORT = 5050;

async function fetchWeather() {
  const city = input.value.trim();
  if (!city) {
    alert("Please enter a city or ZIP code.");
    return;
  }

  output.innerHTML = "Loading...";

  try {
    const res = await fetch(
      `http://localhost:${BACKEND_PORT}/weather?city=${encodeURIComponent(city)}`
    );
    const data = await res.json();

    if (data.error) {
      output.innerHTML = `<p style="color:red;">${data.error}</p>`;
      return;
    }

    output.innerHTML = `
      <h3>${data.location}, ${data.region}</h3>
      <p><strong>Condition:</strong> ${data.condition}</p>
      <p><strong>Temperature:</strong> ${data.temp_f}°F</p>
      <p><strong>Feels Like:</strong> ${data.feelslike_f}°F</p>
      <p><strong>Wind:</strong> ${data.wind_mph} mph</p>
      <p><strong>Humidity:</strong> ${data.humidity}%</p>
      <p><em>Last updated:</em> ${data.last_updated}</p>
    `;
  } catch (err) {
    console.error(err);
    output.innerHTML = `<p style="color:red;">Error reaching backend. Is server.py running?</p>`;
  }
}
