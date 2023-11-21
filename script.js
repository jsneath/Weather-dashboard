var todaysWeather = document.querySelector("#cityName")
var today = dayjs().format('DD/MM/YYYY');
var searchItem = document.querySelector(".weather-search")
document.addEventListener('DOMContentLoaded', loadSearches);


function loadWeather(cityName) {

    if (!cityName) {
        var searchItem = document.querySelector(".weather-search");
        cityName = searchItem.value;
    }
    
    var key = "94f82e011baf95e0162c81c9aa8a34fe"
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key
    var todayQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key

    fetch(todayQueryURL)
       .then(function (response) {
       return response.json();
        }).then(function (data) {
       console.log(todayQueryURL);
 
       console.log(data);
       // storing the data from the Fetch request in the results variable
       
       todaysWeather.textContent= cityName.charAt(0).toUpperCase() + cityName.slice(1);
       
          var tempData = data.main.temp
          var temp = (tempData - 273.15).toFixed(2)
          var wind = data.wind.speed
          var humidity = data.main.humidity
          var card = document.getElementById('card-1')
          var iconCode = data.weather[0].icon
          var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
 
          card.querySelector('.card-date').textContent = "(" + today + ")";
          card.querySelector('.card-temp').textContent = "Temp: " + temp + "°C";
          card.querySelector('.card-wind').textContent = "Wind: " + wind + " KPH";
          card.querySelector('.card-humid').textContent = "Humidity: " + humidity + "%";
          card.querySelector('.icon').src = iconUrl;
               
    });

    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      // After data comes back from the request
      .then(function (data) {
        console.log(queryURL);
  
        console.log(data);
        // storing the data from the Fetch request in the results variable

        for (i = 4, cardNumber = 2; i <= data.list.length; i +=8, cardNumber++) {
            
            if (data.list[i]) {
                var tempData = data.list[i].main.temp
                var temp = (tempData - 273.15).toFixed(2)
                var wind = data.list[i].wind.speed
                var humidity = data.list[i].main.humidity
                var dateTime = data.list[i].dt_txt; // "2023-11-23 12:00:00"
                var datePart = dateTime.split(' ')[0]; // Gets "2023-11-23"
                var dateParts = datePart.split('-'); // Splits into ["2023", "11", "23"]

                // Rearrange and format the date to "23/11/2023"
                var formattedDate = dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0];
                var iconCode = data.list[i].weather[0].icon
                var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
                // card.querySelector('.icon').src = iconUrl;

                var card = document.getElementById('card-' + cardNumber);

                card.querySelector('.card-date').textContent = formattedDate;
                card.querySelector('.card-temp').textContent = "Temp: " + temp + "°C";
                card.querySelector('.card-wind').textContent = "Wind: " + wind + " KPH";
                card.querySelector('.card-humid').textContent = "Humidity: " + humidity + "%";
                card.querySelector('.icon').src = iconUrl;

              
            } 
        }
    });
}

$(".search-button").on("click", function (event) {
    event.preventDefault()
    var cityName = $("#search-input").val();
    loadWeather(cityName)
    saveSearch(cityName)
    document.querySelector('.weather-container').style.display = 'block';
    document.getElementById('search-input').value = '';
});

 function saveSearch(cityName) {
    // Get existing searches from localStorage or initialize an empty array if none
    let searches = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Add the new city to the array
    searches.push(cityName.charAt(0).toUpperCase() + cityName.slice(1));

    // Save back to localStorage
    localStorage.setItem('searchHistory', JSON.stringify(searches));  
    loadSearches()
    }


 function loadSearches() {
    // Get existing searches from localStorage
    let searches = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Assuming you have a div or ul element to display the cities
    let searchList = document.querySelector('.search-list');
    searchList.innerHTML = ''; // Clear existing list

    // Create a list item for each search and append it to the list
    searches.forEach(city => {
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        button.textContent = city

        button.onclick = function() { loadWeather(city); }
        listItem.appendChild(button);
        searchList.appendChild(listItem);
    });
}
