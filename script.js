

$("button").on("click", function (event) {
   event.preventDefault()
   var searchItem = document.querySelector(".weather-search")
    var cityName = searchItem.value
    var key = "94f82e011baf95e0162c81c9aa8a34fe"
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key
 
  
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
        var results = JSON.stringify(data.list[0], null, 2)
        var temp = data.list[0].main.temp
        var wind = data.list[0].wind.speed
        var humidity = data.list[0].main.humidity
        var date = data.list[0].dt_txt
        console.log(temp)
        console.log(wind)
        console.log(humidity)
        console.log(date)

        console.log("the results are" + results)
        // }
      });
  });