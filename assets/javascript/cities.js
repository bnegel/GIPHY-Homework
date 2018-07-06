$(document).ready(function() {

var topic = ["Chicago", "New York", "Los Angeles", "Boston", "San Francisco", "Rome", "Florence", "Paris", "London", "Beijing", "Shanghai", "Seoul", "Tokyo", 
    "Hanoi", "Bangkok", "Lhasa", "Accra", "Nairobi", "Cairo", "Tunis", "Marrakech", "Algiers", "Sydney", "Mexico City", "Sao Paulo"]

    function renderButtons() {
        $("#button-row").empty();
        for (var i = 0; i < topic.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("city", "btn btn-info");
        newButton.attr("data-name", topic[i]);
        newButton.text(topic[i]);
        $("#button-row").append(newButton);

        }
    }
        
    function newCityButton() { 
        $("#add-city").on("click", function() {
            event.preventDefault();
            var city = $("#topic-input").val().trim();
            topic.push(city);
            renderButtons();
            });
        }

    function displayCityGifs(){
        var city = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=GNucwTsVvut0QVv6VMBXPYNvZ1qfMgWL"
        //GIPHY API Key =  GNucwTsVvut0QVv6VMBXPYNvZ1qfMgWL   
        console.log(this);

        $.ajax({
        url: queryURL,
        method: "GET"
        })

        .then(function(response) {
            $("<gifs-div>").empty();
            var cityChosen = response.data;
            for (var i = 0; i < results.length; i++) {
                var gifsDiv = $("<gifs-div>");
                var rating = $("<p>").text("Rating: " + cityChosen[i].rating);
                gifsDiv.append(rating);

                var gifData = $("<img>");
                gifData.attr("src", results[i].images.url);
                gifsDiv.append(gifData);
                $("#gifs-div").prepend(gifsDiv);
            }

        })

    }
    $(document).on("click", ".city", displayCityGifs);
    renderButtons();
    newCityButton();
    displayCityGifs();

})