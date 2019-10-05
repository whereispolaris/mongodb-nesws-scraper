$(document).ready(function () {
    $("#scrape-button").on("click", event => {
        event.preventDefault();
        $.getJSON("/scrape", data => {
            console.log(data[0].image);

            for (var i = 0; i < data.length; i++) {
                var horiCard = $("<div>");
                horiCard.attr({
                    class: "card horizontal"
                })
                var imgCard = $("<div>");
                imgCard.addClass("card-image");
                var image = $("<img>");
                image.attr("src", data[i].image);
                var cardStacked = $("<div>");
                cardStacked.addClass("card-stacked");
                var cardContent = $("<div>");
                cardContent.addClass("card-content");
                var h3Tag = $("<h5>");
                h3Tag.text(data[i].title);
                var pTag = $("<p>");
                pTag.text(data[i].summary);
                var cardAction = $("<div>");
                cardAction.addClass("card-action");
                var cardButton = $("<button>");
                cardButton.attr({
                    "data-index": i,
                    "class": "waves-effect waves-light btn orange cardButton"
                });
                cardButton.text("Save Article");
                var linkButton = $("<a>");
                linkButton.attr({
                    "href": data[i].link,
                    "data-index": i,
                    class: "waves-effect waves-light btn blue"
                });
                linkButton.text("Go to Article");

                cardAction.append(cardButton, linkButton);
                cardContent.append(h3Tag, pTag);
                cardStacked.append(cardContent, cardAction);
                imgCard.append(image);
                horiCard.append(imgCard, cardStacked);

                $("#articleContainer").append(horiCard);

            }
            // Save Article to MongoDB
            $(".cardButton").on("click", function (event) {
                event.preventDefault();
                var index = $(this).data("index");
                var dataObjext = data[index];
                $.post("/submit", dataObjext, function (response) {
                    console.log(response);
                    alert("Article Saved!");
                });
            });
        });

    });
});



// To Do
// POST
// - Add Index to card
// - Create onclick event that 
//      * gets the index value
//      * makes $.getJSON request
//      * use index index value to get post
//      * save object to variable (artibleBody)
//      * make POST request with artibleBody

// Saved Articles
// make GET request to "/saved"
// Generate cards

