//better coded now
document.addEventListener('DOMContentLoaded',()=>{
    const container = document.querySelector('.container');
    const search = document.querySelector('.search-box button');
    const weatherBox = document.querySelector('.weather-box');
    const weatherDetails = document.querySelector('.weather-details');
    const error404 = document.querySelector('.not-found');

    search.addEventListener('click', ()=>{
const apiKey = 'eabdee80bdc5bedf82a137af78cc105b'
const city = document.querySelector('.search-box input').value.trim()
if(city==='')
    return

fetchWeatherData(apiKey,city);
})

const fetchWeatherData=async(apiKey,city)=>{
    try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    const data = await response.json()   
    if(data.cod === '404'){
        errorPage()
    }else{
        weatherPage(data)
    }
} catch (error) {
    console.error('following error occured :',error)
}
}
const errorPage=()=>{
container.style.height = '400px'
weatherBox.style.display = 'none'
weatherDetails.style.display = 'none'
error404.style.display = 'block'
error404.classList.add('fadeIn')
}
const weatherPage =(data)=>{
error404.style.display = 'none'
error404.classList.remove('fadeIn');
const image = document.querySelector(".weather-box img")
const humidity = document.querySelector('.weather-details .humidity .text span')
const wind = document.querySelector('.weather-details .wind .text span')
const temperature = document.querySelector('.weather-box  .temperature ')
const description = document.querySelector('.weather-box  .description ')

temperature.innerHTML = `${parseInt(data.main.temp)}<span>C</span>`
humidity.innerHTML = `${parseInt(data.main.humidity)}%`
wind.innerHTML = `${parseInt(data.wind.speed)}km/h`
description.innerHTML = `${data.weather[0].description}`
switch (data.weather[0].main) {
    case 'Clear':
        image.src ='images/clear.png'
        break;
        case 'Haze':
        image.src ='images/mist.png'
        break;
        case 'Clouds':
        image.src ='images/cloud.png';
        break;
        case 'Rain':
        image.src ='images/rain.png';
        break;
        case 'Snow':
image.src ='images/snow.png'
        break;
    default:
image.src='';
}

weatherBox.style.display = '';
weatherDetails.style.display = '';
weatherBox.classList.add('fadeIn')
weatherDetails.classList.add('fadeIn')
container.style.height = '590px'
}
})
