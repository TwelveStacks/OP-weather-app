const temperature = document.querySelector('.temp');
const feelsLike = document.querySelector('.feels-like');
const currentCity = document.querySelector('#cur-city');
const cityInput = document.querySelector('#city');
const weatherIcon = document.querySelector('.weather-icon');
const submitBtn = document.querySelector('#submitButton');
const weatherCon = document.querySelector('.condition');
const weatherDiv = document.querySelector('.weather-div');
const time = document.querySelector('.time');

let apikey = '528f9ac2392e42c8b31203951240703';
let city = 'Toronto';

getData()

submitBtn.addEventListener('click', () => {
    update();
})

cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        update();
    }
})

async function getData() {
    try {
        const response = await fetch('https://api.weatherapi.com/v1/current.json?key=' + apikey + '&q=' + city, { mode: 'cors' })
        const weather = await response.json();
        console.log(weather)
        getWeatherIcon(weather);
        currentCity.textContent = weather['location']['name'];
        weatherCon.textContent = weather['current']['condition']['text'];
        time.textContent = `Local Time: ${weather['location']['localtime']}`;

        try {
            let getCelcius = await weather['current']['temp_c']
            temperature.textContent = `Temperature ${getCelcius} °C`
        } catch (celciusError) {
            console.log("Error occurred while getting Celcius", celciusError);
        }

        try {
            let getFeelsLikeCelsius = await weather['current']['feelslike_c']
            feelsLike.textContent = `Feels like ${getFeelsLikeCelsius} °C`
        } catch (error2) {
            console.log("Error occurred while getting feels like temperature in Celcius", error2);
        }
    } catch (error) {
        console.log("Error occurred while making request", error);
        alert('Invalid city. Please try again.')
    }
}

async function getWeatherIcon(data) {
    try {
        let icon = data['current']['condition']['icon'];
        weatherIcon.src = icon;
    } catch (error) {
        console.log('Error fetching icon.', error)
    }
}

function update() {
    let input = cityInput.value.trim();
    let modifiedInput = input.replace(/\s/g, "_");
    city = modifiedInput;
    getData();
}
