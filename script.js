const farenheit = document.querySelector('.temp-f')
const celcius = document.querySelector('.temp-c')
const feelsLikeC = document.querySelector('.feels-like-c')

let apikey = '528f9ac2392e42c8b31203951240703'
let city = 'toronto'

getWeather()

async function getWeather() {
    const response = await fetch('https://api.weatherapi.com/v1/current.json?key=' + apikey + '&q=' + city, { mode: 'cors' })
    const weather = await response.json();
    console.log(weather)
    celcius.textContent = `${weather['current']['temp_c']} °C`
    farenheit.textContent = `${weather['current']['temp_f']} °F`
    feelsLikeC.textContent = `Feels like ${weather['current']['feelslike_c']} °C`
}

