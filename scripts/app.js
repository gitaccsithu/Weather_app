const city_form = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details"); 
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
    // const city_data = data.city_data;
    // const weather_data = data.weather_data;
    // destructuring properties is setting the properties of 
    // an object into same name variable in the short form
    const {city_data, weather_data} = data; // destructuring properties
    console.log(weather_data);
    
    //update details template
    details.innerHTML = `
        <h5 class="my-3">${city_data.EnglishName}</h5>
        <div class="my-3">${weather_data.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather_data.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    const icon_src = `img/icons/${weather_data.WeatherIcon}.svg`;
    icon.setAttribute("src", icon_src);

    // tenery operator
    // tenery operator check certain condition and return one of two value
    // variable = condition ? value1 : value2;
    // either value one or vlaue two will be returned depending on the condition
    let timeSrc = weather_data.IsDayTime ? "img/day.svg" : "img/night.svg";
    // if(weather_data.IsDayTime) {
    //     timeSrc = "img/day.svg";
    // } else {
    //     timeSrc = "img/night.svg";
    // }

    time.setAttribute("src", timeSrc);

    // remove d-none
    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none");
    }
}

const updateCity = async (city) => {
    const city_data = await get_city(city);
    const weather_data = await get_weather(city_data.Key);
    return { city_data, weather_data } // this is returning an object where the variable names and 
                                    // values have the same name
}

city_form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = city_form.city.value.trim();
    localStorage.setItem("city", city);
    city_form.reset();
    updateCity(city).then(data => {
        updateUI(data);
    }).catch(err => {
        console.log(err);
    });
});

if (localStorage.getItem("city")) {
    updateCity(localStorage.getItem("city"))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}
