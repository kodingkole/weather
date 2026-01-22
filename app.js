const apiKey = "5d1040e59808ce0f43dcb3c54936184a";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const weatherCard = document.getElementById("weatherCard");
const cityName = document.getElementById("cityName");
const weatherDesc = document.getElementById("weatherDesc");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");
const errorMsg = document.getElementById("errorMsg");
const dateTime = document.getElementById("dateTime");

// Update time
setInterval(() => {
  const now = new Date();
  dateTime.innerText = now.toLocaleString();
}, 1000);

function updateBackground(weather) {
  document.body.className = ""; // previous class remove

  if (weather.includes("cloud")) {
    document.body.classList.add("bg-cloud");
  } else if (weather.includes("rain")) {
    document.body.classList.add("bg-rain");
  } else if (weather.includes("clear")) {
    document.body.classList.add("bg-clear");
  } else if (weather.includes("snow")) {
    document.body.classList.add("bg-snow");
  } else {
    document.body.classList.add("bg-default");
  }
}


searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    errorMsg.innerText = "Please enter a city name!";
    errorMsg.classList.remove("hidden");
    return;
  }

  // Loading
  searchBtn.disabled = true;
  searchBtn.innerText = "Loading...";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((data) => {
      searchBtn.disabled = false;
      searchBtn.innerText = "Search";

      if (data.cod !== 200) {
        errorMsg.innerText = data.message;
        errorMsg.classList.remove("hidden");
        weatherCard.classList.add("hidden");
        return;
      }

      errorMsg.classList.add("hidden");
      weatherCard.classList.remove("hidden");

      cityName.innerText = `${data.name}, ${data.sys.country}`;
      weatherDesc.innerText = data.weather[0].description;
      temp.innerText = `${Math.round(data.main.temp)}°C`;
      humidity.innerText = `${data.main.humidity}%`;
      wind.innerText = `${Math.round(data.wind.speed * 3.6)} km/h`;
      feelsLike.innerText = `${Math.round(data.main.feels_like)}°C`;

      weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      updateBackground(data.weather[0].main.toLowerCase());
    })
    .catch(() => {
      searchBtn.disabled = false;
      searchBtn.innerText = "Search";

      errorMsg.innerText = "Something went wrong!";
      errorMsg.classList.remove("hidden");
    });
});

// Press Enter key
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});
