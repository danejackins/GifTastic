$(document).ready(function() {

    // Initial array of superheros
    var superheros = ['Captain America', 'Iron Man', 'Batman', 'Hulk', 'Spiderman'];

    // displaySuperheroInfo function re-renders the HTM to display the appropriate content
    function displaySuperheroInfo() {

        // Grabbing and storing the data-name
        var hero = $(this).attr("data-name");
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' +
            hero + '&api_key=dc6zaTOxFJmzC&limit=10';

        // Creates AJAX call for the specific superhero button being clicked
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function(response) {

            // Storing an array of results in the results variable
            var results = response.data;
            console.log('results', results);

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                console.log('result', result);
                //Only taking action if the photo has an appropriate rating
                if (result.rating !== 'r' && result.rating !== 'pg-13') {


                    // Creating a div with the class "item"
                    var gifDiv = $("<div class='item'>");

                    // Storing the results item's rating
                    var rating = result.rating;

                    // Creating a paragraph tag with the results item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var superheroImage = $("<img>");
                    var animatedUrl = result.images.fixed_height.url;
                    var stillUrl = result.images.fixed_height_still.url;

                    // Giving the image tag an src attribute of a property pulled off the result item
                    superheroImage.attr("src", stillUrl);
                    superheroImage.attr("data-still", stillUrl); // url for image
                    superheroImage.attr("data-animate", animatedUrl); // url for animation
                    superheroImage.attr("data-state", "still"); // toggle variable
                    superheroImage.addClass('superhero-image');

                    // Appending the paragraph and superheroImage we created to the "gifDiv" div created
                    gifDiv.append(superheroImage);
                    gifDiv.append(p);

                    // Prepending the gifDiv to the "#superhero-view" div in the HTML
                    $("#superhero-view").prepend(gifDiv);
                };
            };    
        });
    }

    function renderButtons() {
        // Deletes the superheros prior to adding new ones so I don't have repeat buttons
        $("#buttons-view").empty();

        // Loops through the array of movies
        for (var i = 0; i < superheros.length; i++) {
            
            //Then dynamically generates buttons for each movie in the array
            var a = $("<button>");
            // Adds a class of hero to the button
            a.addClass("hero");
            // Added a data-attribute
            a.attr("data-name", superheros[i]);
            // Provided the initial button text
            a.text(superheros[i]);
            // Added the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where the add movie button is clicked
    $("#add-superhero").on('click', function(event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var hero = $("#superhero-input").val().trim();
        // The superhero from the textbox is then added to the array
        superheros.push(hero);
        console.log('superheros', superheros);
        // Calling renderButtons to handle processing of the array
        renderButtons();
    });

    // Adding click event listeners to all elements with a class of "hero"
    $(document).on('click', ".hero", displaySuperheroInfo);
    renderButtons();

    // does not work because there are no images with the class of superhero-image created at this point
    //$(".superhero-image").on("click", function() {
    $(document).on('click', '.superhero-image', function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
});