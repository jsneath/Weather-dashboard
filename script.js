var todaysWeather = document.querySelector("#cityName")
var today = dayjs().format('DD/MM/YYYY');






$("button").on("click", function (event) {
   event.preventDefault()
   var searchItem = document.querySelector(".weather-search")
    var cityName = searchItem.value
    var key = "94f82e011baf95e0162c81c9aa8a34fe"
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key

    var todayQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key
 
  
    fetch(todayQueryURL)
    .then(function (response) {
      return response.json();
    })
    // After data comes back from the request
    .then(function (data) {
      console.log(todayQueryURL);

      console.log(data);
      // storing the data from the Fetch request in the results variable
      
      todaysWeather.textContent= cityName
      
         var temp = data.main.temp
         var wind = data.wind.speed
         var humidity = data.main.humidity
         var card = document.getElementById('card-1')

         card.querySelector('.card-date').textContent = "Date: " + today;
         card.querySelector('.card-temp').textContent = "Temperature: " + temp + "°C";
         card.querySelector('.card-wind').textContent = "Wind Speed: " + wind + " km/h";
         card.querySelector('.card-humid').textContent = "Humidity: " + humidity + "%";
              
    });


    // Performing an Fetch request with the queryURL
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      // After data comes back from the request
      .then(function (data) {
        console.log(queryURL);
  
        console.log(data);
        // storing the data from the Fetch request in the results variable

        for (i = 0, cardNumber = 2; i <= data.list.length; i +=8, cardNumber++) {
            
            if (data.list[i]) {
                var temp = data.list[i].main.temp
                var wind = data.list[i].wind.speed
                var humidity = data.list[i].main.humidity
                var date = data.list[i].dt_txt

                var card = document.getElementById('card-' + cardNumber);

                card.querySelector('.card-date').textContent = "Date: " + date;
                card.querySelector('.card-temp').textContent = "Temperature: " + temp + "°C";
                card.querySelector('.card-wind').textContent = "Wind Speed: " + wind + " km/h";
                card.querySelector('.card-humid').textContent = "Humidity: " + humidity + "%";
                

                console.log(temp)
                console.log(wind)
                console.log(humidity)
                console.log(date)
            } 
        }
        
      });
  });