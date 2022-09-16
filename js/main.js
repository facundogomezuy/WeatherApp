fetch("https://api.openweathermap.org/data/2.5/weather?q=Canelones&appid=fb9f2f55dfb736f6d0c89f87e2aaf0e9&units=metric&lang=es")
    .then((response) => response.json())
    .then((weApi) => {
        document.getElementsByClassName("listName")[0].innerHTML = "";
        let time = new Date();
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=Canelones&appid=fb9f2f55dfb736f6d0c89f87e2aaf0e9&units=metric&lang=es")
            .then((response) => response.json())
            .then((dailyWe) => {
                show(weApi, dailyWe);
            });
    });

document.getElementById("region").addEventListener("keyup", () => {
    let valor = document.getElementById("region").value;
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + valor + "&appid=fb9f2f55dfb736f6d0c89f87e2aaf0e9&units=metric&lang=es")
        .then((response) => response.json())
        .then((dato) => {
            document.getElementsByClassName("listName")[0].innerHTML = "";
            document.getElementsByClassName("listName")[0].innerHTML += `
                <li style="cursor:pointer; border:1px solid black; background-color:white;" id="${dato.name}" class="cityName">${dato.name} <li>
            `;
            clickShow(dato);
            fetch("https://api.openweathermap.org/data/2.5/forecast?q="+valor+"&appid=fb9f2f55dfb736f6d0c89f87e2aaf0e9&units=metric&lang=es")
            .then((response) => response.json())
            .then((dailyWe) => {
                clickShow(dato,dailyWe)
                
            });
    });
});

function clickShow(weather, dailyWe) {
    document.querySelectorAll(".cityName").forEach((element, index) => {
        element.addEventListener("click", () => {
            document.getElementsByClassName("listName")[0].innerHTML = "";
            show(weather, dailyWe);
        });
    });
}

function show(weather, dailyWe) {
    let weatherIcon = undefined;
    let dailyIcon = undefined;
    let time = new Date();
    document.getElementsByClassName("dayData")[0].innerHTML = "";
    document.getElementsByClassName("dayData")[0].innerHTML += `
        <div style="display:flex; flex-direction:column; align-items:flex-start; padding:10px;">
            <div style="display:flex;">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                <h4 style="margin-left:5px; font-weight:1000000; font-size:20px; font-family: 'Lato', sans-serif;">${weather.name}</h4>
            </div>
            <p style="color:gray;">${time.toLocaleString()}</p>
            <div style="display:flex; width:100%; justify-content:space-between;">
                <div>
                    <img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}.png" style="width:110px;">
                    <p style="font-size:2.3em; font-family: 'Lato', sans-serif;">${Math.round(
                        weather.main.temp
                    )}°</p>
                </div>
                <div style="display:flex; flex-direction:column; align-items:flex-end; padding-top:50px; margin-left:30px;">
                    <p>${weather.weather[0].description}</p>
                    <p>Sensacion Termica: ${Math.round(weather.main.feels_like)}°C</p>
                    <p> ${Math.round(weather.main.temp_max)}/${Math.round(weather.main.temp_min)}</p>
                </div>
            </div>
            <div>
                <div style="display:flex;">
                    <div class="afterWeather">
                        <p>${dailyWe.list[0].dt_txt.slice(-8)}</p>
                        <img src="http://openweathermap.org/img/wn/${
                            dailyWe.list[0].weather[0].icon
                        }.png" style="width:80px;">
                        <p>${Math.round(dailyWe.list[0].main.temp)}°</p>
                    </div>
                    <div class="afterWeather">
                        <p>${dailyWe.list[1].dt_txt.slice(-8)}</p>
                        <img src="http://openweathermap.org/img/wn/${
                            dailyWe.list[1].weather[0].icon
                        }.png" style="width:80px;">
                        <p>${Math.round(dailyWe.list[1].main.temp)}°</p>
                    </div>
                    <div class="afterWeather">
                        <p>${dailyWe.list[2].dt_txt.slice(-8)}</p>
                        <img src="http://openweathermap.org/img/wn/${
                            dailyWe.list[2].weather[0].icon
                        }.png" style="width:80px;">
                        <p>${Math.round(dailyWe.list[2].main.temp)}°</p>

                    </div>
                    <div class="afterWeather">
                        <p>${dailyWe.list[3].dt_txt.slice(-8)}</p>
                        <img src="http://openweathermap.org/img/wn/${
                            dailyWe.list[3].weather[0].icon
                        }.png" style="width:80px;">
                        <p>${Math.round(dailyWe.list[3].main.temp)}°</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.getElementById("data-table").innerHTML = ""
    document.getElementById("data-table").innerHTML += `
            <table>
                <tr>
                    <td><img src="img/pressure.png" width="60px"></td>
                    <td>Presión</td>
                    <td>${weather.main.pressure} Pa</td>
                </tr>
                <tr>
                    <td><img src="img/humidity.png" width="60px"></td>
                    <td>Humedad</td>
                    <td>${weather.main.humidity}%</td>
                </tr>
                <tr>
                    <td><img src="img/wind.png" width="60px"></td>
                    <td>Viento</td>
                    <td>${weather.wind.speed} km/h</td>
                </tr>
            </table>
        `;
}

function imgSelect(imgValue) {
    switch (imgValue) {
        case "Clouds":
            return "/img/Clouds.png";
            break;
        case "Clear":
            return "/img/sun.png";
            break;
    }
}
