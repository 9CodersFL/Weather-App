const apiKey = "b6bbc2b524b2042af36f5d5597d85b2f";
let currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
let currentTemp = document.getElementById('currentTemp');
let wind = document.getElementById('wind');
let humidity = document.getElementById('humidity');
let otherHumidity = document.getElementById('otherHumidity');
let maxMin = document.getElementById('maxMin');
let pressure = document.getElementById('pressure');
let uvIndex = document.getElementById('uvIndex');
let dewPoint = document.getElementById('dewPoint');
let feelsLike = document.getElementById('feelsLike');
let dateContainer = document.getElementById('dateContainer');
let page1 = document.getElementById('page1');
let page2 = document.getElementById('page2');
let weekContainer = document.getElementById('weekContainer');
let icon = document.getElementById('icon');

async function fetchWeather() {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth();
    let day = "";
    let getDay = newDate.getDay();
    switch (getDay) {
        case 0:
            day = 'Sunday';
            break;
        case 1:
            day = 'Monday';
            break;
        case 2:
            day = 'Tuesday';
            break;
        case 3:
            day = 'Wednesday';
            break;
        case 4:
            day = 'Thursday';
            break;
        case 5:
            day = 'Friday';
            break;
        case 6:
            day = 'Saturday';
            break;
    }
    dateContainer.innerHTML = `${day}, ${date} ${month}`
    let city = document.getElementById('city');
    let weatherObj = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`);
    let weatherJson = await weatherObj.json();
    getFullWeather(weatherJson);
}
async function getFullWeather(json) {
    console.log(json)
    let fullWeatherObj = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${json.coord.lat}&lon=${json.coord.lon}&units=metric&exclude=minutely,hourly&appid=${apiKey}`);
    let fullWeatherJson = await fullWeatherObj.json();
    renderData(fullWeatherJson);
}

function renderData(json) {
    console.log(json)
    currentTemp.innerHTML = `${round(json.daily[0].temp.day)}&#176;C`;
    wind.innerHTML = `${json.daily[0].wind_speed} km/hr`;
    humidity.innerHTML = `${json.daily[0].humidity}%`;
    otherHumidity.innerHTML = `${json.daily[0].humidity}%`;
    maxMin.innerHTML = `${round(json.daily[0].temp.max)}&#176;C / ${round(json.daily[0].temp.min)}&#176;C`;
    dewPoint.innerHTML = `${json.daily[0].dew_point}&#176;C`;
    uvIndex.innerHTML = `${json.daily[0].uvi}`
    feelsLike.innerHTML = `${round(json.daily[0].feels_like.day)}&#176;C`;
    pressure.innerHTML = `${round(json.daily[0].pressure)}mBar`;
    chooseIcon(json.daily[0].weather[0].icon);
    weekContainer.innerHTML = "";
    for (let i = 1; i < json.daily.length; i++) {
        weekContainer.innerHTML += `
        <div class="elem-parent">
            <div class="day">${moment(json.daily[i].dt*1000).format("dddd")}</div>
                <div class=temp-parent">
                    <div class="elem">
                        Temp : ${round(json.daily[i].temp.day)}&#176;C
                    </div>
                    <div class="elem">
                        Feels Like : ${round(json.daily[i].feels_like.day)}&#176;C
                    </div>
                </div>
        </div>
        `
    }

}
function round(value) {
    let roundValue = Math.round(value);
    return roundValue;
}
function changePage(page) {
    switch (page) {
        case "home":
            page1.style.display = "flex";
            page2.style.display = "none";
            break;
        case "week":
            page1.style.display = "none";
            page2.style.display = "flex";
        default:
            break;
    }
}

function chooseIcon(iconId){
    iconId = iconId.slice(0, 2);
    switch (iconId) {
        case "01":
            icon.src = "/icons/sun/clearsky.png";
            break;
        case "02":
            icon.src = "/icons/cloud/cloud.png";
            break;
        case "03":
            icon.src = "/icons/cloud/cloud.png";
            break;
        case "04":
            icon.src = "/icons/cloud/cloud.png";
            break;
        case "09":
            icon.src = "/icons/cloud/rain.png";
            break;
        case "10":
            icon.src = "/icons/cloud/rain.png";
            break;
        case "11":
            icon.src = "/icons/cloud/thunderstorm.png";
            break;
        case "13":
            icon.src = "/icons/cloud/snow.png";
            break;
        case "50":
            icon.src = "/icons/sun/mist.png";
            break;
        
        default:
            break;
    }
}