const weather_temperaure = document.querySelector(".header__weather__temperature"),
    weather_place = document.querySelector(".header__weather__location"),
    weather_icon = document.querySelector(".header__weather__icon");

const API_KEY = "0d43e7ad48fe3c77715e00814ceb0463";
const COORDS_LS = 'coords';

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lng}&appid=${API_KEY}`
    ).then(function (response) {
        return response.json()
    }).then(function (json) {
        console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        const icon = json.weather[0]["icon"];
        weather_temperaure.innerText = `${temperature}°`;
        weather_place.innerText = `${place}`;
        weather_icon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    })
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }
    localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't acces geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    console.log("loadCoords");
    const loadedCoords = localStorage.getItem(COORDS_LS);
    if (loadedCoords === null) {
        askForCoords();
    }
    else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
    setInterval(loadCoords, 1000 * 3600);
}

init();