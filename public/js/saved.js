$(document).ready(function () {
    console.log("ready");
    event.preventDefault();
    $.getJSON("/all", data => {
        // console.log(data);

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
            var commentButton = $("<button>");
            commentButton.attr({
                "data-index": i,
                "class": "waves-effect waves-light btn blue commentButton"
            });
            commentButton.text("Add Comment");
            var deleteButton = $("<button>");
            deleteButton.attr({
                "data-index": i,
                class: "waves-effect btn red deleteButton"
            });
            deleteButton.text("Delete Article");

            cardAction.append(commentButton, deleteButton);
            cardContent.append(h3Tag, pTag);
            cardStacked.append(cardContent, cardAction);
            imgCard.append(image);
            horiCard.append(imgCard, cardStacked);

            $("#savedArticleContainer").append(horiCard);

        }

        // This is not working yet
        $(".deleteButton").on("click", function (event) {
            event.preventDefault();
            var index = $(this).data("index");
            var articleID = data[index]._id;
            console.log(articleID);
            $.post("/delete/" + articleID, function (response) {
                alert("Article " + articleID + " deleted!");
            });
        });

        // Save Comment to MongoDB
        $(".commentButton").on("click", function (event) {
            event.preventDefault();
            console.log("comment button");
        });
    });
});


