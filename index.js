const API_KEY = 'solaris-1Cqgm3S6nlMechWO';
const BASE_URL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies";
let planetData;

async function fetchData() {
    try {
        let resp = await fetch(BASE_URL, {
            method: "GET",
            headers: { "x-zocom": API_KEY },
        });
        const data = await resp.json();
       /* console.log("API Response:1:", data);
        console.log("Fetched data:2:", data);
        console.log("Names of planets:3:", data.bodies.map(planet => planet.name));*/

        planetData = data.bodies;
        return planetData;
    } catch (error) {
        console.log/*4:Error,*/(" cannot fetch the data", error);
        return [];
    }
}
function hidePlanets() {
    const allPlanets = document.querySelectorAll('.planet');
    
    allPlanets.forEach(planet => {
        planet.style.visibility = 'hidden';
    });
    document.body.style.backgroundColor = '#0C164D'; 
}
function hideHeader() {
    const header = document.querySelector('header');
    header.style.visibility = 'hidden';
    document.body.style.backgroundColor = '#0C164D';
}
function showPlanets() {
    const allPlanets = document.querySelectorAll('.planet');
    allPlanets.forEach(planet => {
        planet.style.visibility = 'visible';
    });
}
function showHeader() {
    const header = document.querySelector('header');
    header.style.visibility = 'visible';
}

const allPlanets = document.getElementById("overlay"); 

function displayAllThePlanets(planet) {
    const planetName = document.getElementById('planet-name');
    const planetLatinName = document.getElementById('planet-latin-name');
    const planetDesc = document.getElementById('planet-desc');
    const planetCircumference = document.getElementById('planet-circumference');
    const planetDistance = document.getElementById('planet-distance');
    const planetMaxTemp = document.getElementById('planet-max-temp');
    const planetMinTemp = document.getElementById('planet-min-temp');
    const planetMoons = document.getElementById('planet-moons');

    planetName.textContent = planet.name;
    planetLatinName.textContent = planet.latinName;
    planetDesc.textContent = planet.desc;
    planetCircumference.textContent = planet.circumference;
    planetDistance.textContent = planet.distance;
    planetMaxTemp.textContent = ` ${planet.temp.day} C`;
    planetMinTemp.textContent = ` ${planet.temp.night} C`;
    planetMoons.textContent = planet.moons;

    const overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';

    const overlayBody = document.querySelector('.overlay-body');
    overlayBody.style.display = 'flex';

    hidePlanets();
    hideHeader();
  
}
function addPlanetClickListeners() {
    const solarisPlanets = document.querySelectorAll('.planet');
    solarisPlanets.forEach((solarisPlanetsElem) => {
        solarisPlanetsElem.addEventListener('click', async () => {
            const planetName = solarisPlanetsElem.id;
           /* console.log('Clicked planet:5:', planetName);*/

            const fetchedData = await fetchData();

            const selectedPlanet = fetchedData.find((planet) => planet.name.toLowerCase() === planetName.toLowerCase());
           /* console.log('Selected planet:6:', selectedPlanet);*/
            if (selectedPlanet) {
                displayAllThePlanets(selectedPlanet);
            }
        });
    });
}

addPlanetClickListeners();

const overlay = document.getElementById('overlay');
overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
        overlay.style.display = 'none';
        const overlayBody = document.querySelector('.overlay-body');
        overlayBody.style.display = 'none';

        showPlanets(); 
        showHeader()
    }
});

   
