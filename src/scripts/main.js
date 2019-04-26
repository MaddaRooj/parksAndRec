console.log("Hello, World!");

let container = document.querySelector("#container");

const parkasHTML = (x) => {
    if (x.visited === true) {
        return `<article class="visited">
                    <h3>${x.name}</h3>
                    <p>State park located in ${x.state}</p>
                    <ul>
                        <li>Currently: ${x.currentWeather}</li>
                        <li>Hourly: ${x.hourlyWeather}</li>
                        <li>Week: ${x.dailyWeather}</li>
                    </ul>
                </article>`;
    }
    else {
        return `<article class="notvisited">
                    <h3>${x.name}</h3>
                    <p>State park located in ${x.state}</p>
                    <ul>
                        <li>Currently: ${x.currentWeather}</li>
                        <li>Hourly: ${x.hourlyWeather}</li>
                        <li>Week: ${x.dailyWeather}</li>
                    </ul>
                </article>`;
    }
};

function addParkToDom(location) {
    container.innerHTML += location;
}

fetch("https://raw.githubusercontent.com/nss-day-cohort-31/national-parks/master/database.json")
    .then(parks => parks.json())
    .then(park => {
        console.log(park.parks);
        park.parks.forEach(specPark => {
            fetch(`https://blooming-mesa-53816.herokuapp.com/${specPark.latitude},${specPark.longitude}`)
                .then(forecasts => forecasts.json())
                .then(forecast => {
                    specPark.currentWeather = forecast.currently.summary;
                    specPark.hourlyWeather = forecast.hourly.summary;
                    specPark.dailyWeather = forecast.daily.summary;
                    const parksAsHTML = parkasHTML(specPark);
                    addParkToDom(parksAsHTML);
                });
        })
    });