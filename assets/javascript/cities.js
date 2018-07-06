$(document).ready(function() {
//Example button array
var topic = ["Chicago", "New York", "Los Angeles", "Boston", "San Francisco", "Rome", "Florence", "Paris", "London", "Beijing", "Shanghai", "Seoul", "Tokyo", 
    "Hanoi", "Bangkok", "Lhasa", "Accra", "Nairobi", "Cairo", "Tunis", "Marrakech", "Algiers", "Sydney", "Mexico City", "Sao Paulo"]

    //Render array buttons to the page
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
    
    //Add button from user input
    function newCityButton() { 
        $("#add-city").on("click", function() {
            event.preventDefault();
            var city = $("#topic-input").val().trim();
            topic.push(city);
            renderButtons();
            });
        }

    //Render gif results for chosen city to the page
   
    // //Get gifs from GIPHY
    $("#button-row").on("click", "button", function() {
        var city = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city + "&api_key=GNucwTsVvut0QVv6VMBXPYNvZ1qfMgWL&limit=10"
        //GIPHY API Key =  GNucwTsVvut0QVv6VMBXPYNvZ1qfMgWL   
        console.log(this);

        $.ajax({
        url: queryURL,
        method: "GET"
        })

        //Render to page along with rating
        .then(function(response) {
            $("#gifs-div").empty();
            var cityChosen = response.data;
            for (var i = 0; i < cityChosen.length; i++) {
                var gifsDiv = $("<div>");
                var rating = $("<p>").text("Rating: " + cityChosen[i].rating);
                gifsDiv.append(rating);

                var gifData = $("<img>");
                gifData.attr("src", cityChosen[i].images.fixed_height_still.url);
                gifData.attr("still", cityChosen[i].images.fixed_height_still.url);
                gifData.attr("animated", cityChosen[i].images.fixed_height.url)
                gifData.attr("state", "still")
                gifsDiv.append(rating);
                gifsDiv.prepend(gifData);
                $("#gifs-div").prepend(gifsDiv);
            }
        })
        $("#gifs-div").on("click", "img", function() {
            var animated = $(this).attr("animated");
            var still = $(this).attr("still");
            var state = $(this).attr("state");
            if(state === "animated") {
               $(this).attr("state", "still")
                $(this).attr("src", still)
            }
            else {
                $(this).attr("state", "animated")
                $(this).attr("src", animated)
            }       
         })

       
    })
    renderButtons();
    newCityButton();
   

})