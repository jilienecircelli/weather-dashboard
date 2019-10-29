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
        var iconcode = response.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        // Log the dataURL
        console.log(dataURL);

        // Log the resulting object
        console.log(response);

        // Converts the temp to Kelvin with the below formula & then sets it to 2 decimal points
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        var temp = tempF.toFixed(2)

        // Transfer content to HTML
        $(".city").html("<h2>Today in " + city + "</h2>");
        $('#wicon').attr('src', iconurl);
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

        // Add the icon based on the forecasted weather

        var icon = responseTwo.list

        // Converts the temp to Kelvin with the below formula & then sets it to 2 decimal points
        var tempOneF = (responseTwo.list[4].main.temp - 273.15) * 1.80 + 32;
        var tempOne = tempOneF.toFixed(2);

        var tempTwoF = (responseTwo.list[12].main.temp - 273.15) * 1.80 + 32;
        var tempTwo = tempTwoF.toFixed(2);

        var tempThreeF = (responseTwo.list[20].main.temp - 273.15) * 1.80 + 32;
        var tempThree = tempThreeF.toFixed(2);

        var tempFourF = (responseTwo.list[28].main.temp - 273.15) * 1.80 + 32;
        var tempFour = tempFourF.toFixed(2);

        var tempFiveF = (responseTwo.list[36].main.temp - 273.15) * 1.80 + 32;
        var tempFive = tempFiveF.toFixed(2);

        // attempting to use substr() to only show the date and remove the hours
        var dayone = responseTwo.list[4].dt_txt;
        var daytwo = responseTwo.list[12].dt_txt;
        var daythree = responseTwo.list[20].dt_txt;
        var dayfour = responseTwo.list[28].dt_txt;
        var dayfive = responseTwo.list[36].dt_txt;


        $("#day-1").html("<h6>" + dayone.substr(0, 10) + "</h6>")
        $("#day-1").append()
        $("#day-1").append("<p>" + "Temp: " + tempOne + "</p>")
        $("#day-1").append("<p>" + "Humidity: " + responseTwo.list[4].main.humidity + "</p>")

        $("#day-2").html("<h6>" + daytwo.substr(0, 10) + "</h6>")
        $("#day-2").append("<p>" + "Temp: " + tempTwo + "</p>")
        $("#day-2").append("<p>" + "Humidity: " + responseTwo.list[12].main.humidity + "</p>")

        $("#day-3").html("<h6>" + daythree.substr(0, 10) + "</h6>")
        $("#day-3").append("<p>" + "Temp: " + tempThree + "</p>")
        $("#day-3").append("<p>" + "Humidity: " + responseTwo.list[20].main.humidity + "</p>")

        $("#day-4").html("<h6>" + dayfour.substr(0, 10) + "</h6>")
        $("#day-4").append("<p>" + "Temp: " + tempFour + "</p>")
        $("#day-4").append("<p>" + "Humidity: " + responseTwo.list[28].main.humidity + "</p>")

        $("#day-5").html("<h6>" + dayfive.substr(0, 10) + "</h6>")
        $("#day-5").append("<p>" + "Temp: " + tempFive + "</p>")
        $("#day-5").append("<p>" + "Humidity: " + responseTwo.list[36].main.humidity + "</p>")

    });

})