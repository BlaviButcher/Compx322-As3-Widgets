/*
 * Constructor function for a WeatherWidget instance.
 *
 * Complete this code to fully describe the WeatherWidget in accordance with the
 * requirements given in the assignment description.
 * The constructor function for Weather Widget takes a single paramener, container_element
 * this is the DOM element passed from the HTML inside which the widget will place its UI\
 *
 * Add to/edit the skeleton code as required, I recommend you follow the defined structure
 * to ensure you meet the requirements for object literals and constructor functions
 *
 */

/**
 * Constructor function for WeatherWidget
 **/

function WeatherWidget(container_element) {
  //PROPERTIES
  //declare the data properties of the object
  let towns;
  let lines = [];
  let lastUpdated;

  //declare properties for the widget's UI and write the code to initalise them
  //you can hard code the values for the town names in the select item, you don't
  //need to do this dynamically when you load the page
  let ui = {
    container: container_element,
    lineContainer: null,
    townSelect: null,
    refreshButton: null,
  };

  createUI();
  populateTowns();

  //create an array of objects with town names and lon, lat values
  //fetch all data from the town table in the db as a json object
  //convert this into an array of objects and assign to the array [towns]

  //

  //FUNCTIONS

  //Write the functions you need for the object, including a fetch request to get the
  //data from the external API, a function to update currently displayed weather items
  //and any others you need to fulfill the requirements

  function createUI() {
    // create the UI for the widget
    // create the select element and populate it with the towns array
    ui.container.className = "weather-widget";

    ui.townSelect = document.createElement("select");
    ui.townSelect.className = "town-select";
    ui.townSelect.addEventListener("change", handleTownClick);
    ui.container.appendChild(ui.townSelect);

    // create container to store lines
    ui.lineContainer = document.createElement("div");
    ui.lineContainer.className = "line-container";
    ui.container.appendChild(ui.lineContainer);

    // create the refresh button element
    ui.refreshButton = document.createElement("button");
    ui.refreshButton.className = "refresh-button";
    ui.refreshButton.textContent = "Refresh";
    ui.refreshButton.addEventListener("click", updateWeather);
    ui.container.appendChild(ui.refreshButton);
  }

  async function updateWeather() {
    for (let line of lines) {
      console.log(line.TownInfo);
      let forecast = await fetchForecast(line.TownInfo);
      line.UpdateForecast(forecast);
    }
  }

  // gets towns and populates dropdown
  async function populateTowns() {
    towns = await getTowns();

    // populate the select element with the towns array
    towns.forEach((item) => {
      let option = document.createElement("option");
      option.text = item.name;
      ui.townSelect.add(option);
    });

    // have a default blurb that gets hidden when the select element is changed first
    let defaultOption = document.createElement("option");
    defaultOption.text = "Select a town";
    defaultOption.setAttribute("disabled", true);
    defaultOption.setAttribute("selected", true);
    defaultOption.setAttribute("hidden", true);
    ui.townSelect.add(defaultOption);
  }

  // fetch forecast from API
  async function fetchForecast(townInfo) {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=ed9b672681bf4b54a4f70425221204&q=${townInfo.lat},${townInfo.lon}&days=1`
    );

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const weatherData = await response.json();
    return weatherData;
  }

  async function handleTownClick(event) {
    let town = towns[event.target.selectedIndex];

    if (lineExists(town.name)) {
      console.log("line exists");
      return;
    }

    weatherData = await fetchForecast(town);

    let line = new WeatherLine(weatherData, town);
    lines.push(line);
    ui.lineContainer.prepend(line.UI.container);
  }

  handleTownClick().catch((error) => {
    error.message;
  });

  function lineExists(town) {
    let exists = false;
    lines.forEach((line) => {
      if (line.TownInfo.town === town) {
        exists = true;
      }
    });
    return exists;
  }

  // asyncronosly get towns
  // We want to wait until the towns are loaded before we can continue
  async function getTowns() {
    const response = await fetch(`php/towns.php`, { method: "GET" });

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    const townData = await response.json();
    return townData;
  }

  // handle error
  getTowns().catch((error) => {
    error.message;
  });

  /*********************************************************
   * Constructor Function for the inner WeatherLine object to hold the
   * full weather data for a town. Add any parameters to this function that you need.
   ********************************************************/

  var WeatherLine = function (data, townData) {
    //declare the data properties for the object
    let townInfo = {
      town: townData.name,
      lat: townData.lat,
      lon: townData.lon,
    };

    let currentTemp = data.current.temp_c;
    let currentCondition = data.current.condition.text;
    let forecastTomorrow = data.forecast.forecastday[0].day.condition.text;

    //declare an inner OBJECT LITERAL to represent the WeatherLine widget's UI
    let ui = {
      container: null,
      town: null,
      currentTemp: null,
      currentCondition: null,
      forecastCondition: null,
    };

    //initialise the ui elements
    ui.container = document.createElement("div");
    ui.container.className = "weather-line";

    ui.town = document.createElement("div");
    ui.town.className = "town";
    ui.town.textContent = townInfo.town;
    ui.container.appendChild(ui.town);

    // create the current temperature element
    ui.currentTemp = document.createElement("div");
    ui.currentTemp.className = "current-temp";
    ui.currentTemp.textContent = `${currentTemp}C`;
    ui.container.appendChild(ui.currentTemp);

    // create the current condition element
    ui.currentCondition = document.createElement("div");
    ui.currentCondition.className = "current-condition";
    ui.currentCondition.textContent = currentCondition;
    ui.container.appendChild(ui.currentCondition);

    // create the forecast condition element
    ui.forecastCondition = document.createElement("div");
    ui.forecastCondition.className = "forecast-condition";
    ui.forecastCondition.textContent = `Tomorrow: ${forecastTomorrow}`;
    ui.container.appendChild(ui.forecastCondition);

    //Add any remaining functions you need for the object, like setters and getter
    // GETTERS
    // I'm doing this a bit different because I don't like getters being functions
    // This way, they are still read only, just need to make sure the objects are a copy
    this.CurrentTemp = currentTemp;
    this.TownInfo = { ...townInfo };
    this.UI = { ...ui };

    this.UpdateForecast = (forecast) => {
      // update the current temperature
      ui.currentTemp.textContent = `${forecast.current.temp_c}C`;

      // update the current condition
      ui.currentCondition.textContent = forecast.current.condition.text;

      // update the forecast condition
      ui.forecastCondition.textContent = `Tomorrow: ${forecast.forecast.forecastday[0].day.condition.text}`;
    };
  };
  //this is the end of the constructor function for the WeatherLine object
}

//this is the end of the constructor funciton for the WeatherWidget object
