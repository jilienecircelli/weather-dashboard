var apiKey = "f2d37efa2c8efd655bc063ea0ad09062";

var city = "";
$("button").on("click", function() {
    var caContent = $("#get-weather")
    var letsGo = caContent.val()
    city = letsGo

    var dataURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: dataURL,
        method: "GET"
    }).then(function(response) { // We store all of the retrieved data inside of an object called "response"
        // Log the dataURL
        console.log(dataURL);

        // Log the resulting object
        console.log(response);

        // Converts the temp to Kelvin with the below formula & then sets it to 2 decimal points
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        var temp = tempF.toFixed(2)

        // Transfer content to HTML
        $(".city").html("<h2>Weather Details: " + city + "</h2>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".temp").text("Temperature (F): " + temp);

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
    });

    // Second AJAX call for 5 day forecast

    var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;

    $.ajax({
        url: fiveDayURL,
        method: "GET"
    }).then(function(responseTwo) {
        // Log the queryURL
        console.log(fiveDayURL);

        // Log the resulting object
        console.log(responseTwo);
        console.log(responseTwo.list[4].dt_txt);
        console.log(responseTwo.list[4].main.temp);

        // Converts the temp to Kelvin with the below formula & then sets it to 2 decimal points
        var tempTwoF = (responseTwo.list[4].main.temp - 273.15) * 1.80 + 32;
        var tempTwo = tempTwoF.toFixed(2);

        $("#day-1").html("<h6>" + responseTwo.list[4].dt_txt + "</h6>")
        $("#day-1").append("<p>" + "Temp: " + tempTwo + "</p>")
        $("#day-1").append("<p>" + "Humidity: " + responseTwo.list[4].main.humidity + "</p>")

        // var card = $("<div class='card' style='width: 12rem'>");
        // var cardDeck = $(".card-deck");
        // var dayOne = $("<h6>" + responseTwo.list[4].dt_txt + "</h6>")
        // cardDeck.append(card);
        // card.append(dayOne)


    });


})