var test = document.getElementsByClassName("weather-header")

$(test).css("color", "green")

var url = "api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}"