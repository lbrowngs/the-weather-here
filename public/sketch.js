let lat, lon;
const button = document.getElementById("submit");

if ("geolocation" in navigator) {
  console.log("geolocation available");
  navigator.geolocation.getCurrentPosition(async (position) => {
    let lat, lon, weather, air;
    try {
      lat = position.coords.latitude.toFixed(2);
      lon = position.coords.longitude.toFixed(2);
      document.getElementById("latitude").textContent = lat;
      document.getElementById("longitude").textContent = lon;
      const api_url = `/weather/${lat},${lon}`;
      const response = await fetch(api_url);
      const json = await response.json();
      weather = json.weather.current;
      air = json.air_quality.results[0].measurements[0];
      document.getElementById("summary").textContent = weather.condition.text;
      document.getElementById("temperature").textContent = weather.temp_f;
      document.getElementById("aq_parameter").textContent = air.parameter;
      document.getElementById("aq_value").textContent = air.value;
      document.getElementById("aq_units").textContent = air.unit;
      document.getElementById("aq_date").textContent = air.lastUpdated;
    } catch (error) {
      console.log("something went wrong");
      air = { value: -1 };
    }
    const data = { lat, lon, weather, air };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const dbresponse = await fetch("/api", options);
    const dbjson = await dbresponse.json();
    console.log(dbjson);
  });
} else {
  console.log("geolocation not available");
}
