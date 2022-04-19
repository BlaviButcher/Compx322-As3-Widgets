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
  let currentTemp;
  let currentCondition;
  let forecastCondition;
  let towns;

  //declare properties for the widget's UI and write the code to initalise them
  //you can hard code the values for the town names in the select item, you don't
  //need to do this dynamically when you load the page
  let ui = {
    container: container_element,
    townSelect: null,
    currentTemp: null,
    currentCondition: null,
    forecastCondition: null,
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
    ui.container.appendChild(ui.townSelect);

    // create the current temperature element
    ui.currentTemp = document.createElement("div");
    ui.currentTemp.className = "current-temp";
    ui.container.appendChild(ui.currentTemp);

    // create the current condition element
    ui.currentCondition = document.createElement("div");
    ui.currentCondition.className = "current-condition";
    ui.container.appendChild(ui.currentCondition);

    // create the forecast condition element
    ui.forecastCondition = document.createElement("div");
    ui.forecastCondition.className = "forecast-condition";
    ui.container.appendChild(ui.forecastCondition);

    // create the refresh button element
    ui.refreshButton = document.createElement("button");
    ui.refreshButton.className = "refresh-button";
    ui.refreshButton.textContent = "Refresh";
    ui.container.appendChild(ui.refreshButton);
  }

  // gets towns and populates dropdown
  async function populateTowns() {
    towns = await getTowns();

    // populate the select element with the towns array
    towns.forEach((item) => {
      let option = document.createElement("option");
      option.text = item.name;
      // store lon and lat in option object for use later
      option.lon = item.lon;
      option.lat = item.lat;
      ui.townSelect.add(option);
    });
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

  var WeatherLine = function () {
    //declare the data properties for the object
    //declare an inner OBJECT LITERAL to represent the WeatherLine widget's UI
    //initialise the ui elements
    //Add any remaining functions you need for the object, like setters and getter
  };
  //this is the end of the constructor function for the WeatherLine object
}

//this is the end of the constructor funciton for the WeatherWidget object
