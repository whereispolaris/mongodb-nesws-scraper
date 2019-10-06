$(document).ready(function () {
    $('.modal').modal();
    event.preventDefault();
    $.getJSON("/all", data => {
        // console.log(data);

        for (var i = 0; i < data.length; i++) {
            var horiCard = $("<div>");
            horiCard.attr({
                class: "card horizontal"
            })
            // Generate elements
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
                "class": "waves-effect waves-light btn blue commentButton modal-trigger",
                "data-target": "modal1"
            });
            commentButton.text("Comments");
            var deleteButton = $("<button>");
            deleteButton.attr({
                "data-index": i,
                "class": "waves-effect btn red deleteButton"
            });
            deleteButton.text("Delete Article");
            // Append elements
            cardAction.append(commentButton, deleteButton);
            cardContent.append(h3Tag, pTag);
            cardStacked.append(cardContent, cardAction);
            imgCard.append(image);
            horiCard.append(imgCard, cardStacked);
            $("#savedArticleContainer").append(horiCard);

        }

        // Delete Article from MongoDB
        $(".deleteButton").on("click", function (event) {
            event.preventDefault();
            var index = $(this).data("index");
            var articleID = data[index]._id;
            console.log(articleID);
            $.post("/delete/" + articleID, function (response) {
                alert("Article " + articleID + " deleted!");
            });
        });

        // Comments 
        $(".commentButton").on("click", function (event) {
            event.preventDefault();
            $(".modal-content").empty();

            var index = $(this).data("index");
            var articleID = data[index]._id;
            var comentHeader = $("<h5>");
            comentHeader.attr("id", "coment-header");
            comentHeader.text("Comments for " + articleID);

            var commentBox = $("<div>");
            commentBox.addClass("commentBox");

            // Display Comments
            if (data[index].comment.length === 0) {
                console.log("there are no comments to display")
                commentBox.text("There are no comments to display.");
            }
            else {
                for (var c = 0; c < data[index].comment.length; c++) {
                    var commentItem = $("<p>");
                    commentItem.attr("comment-id", c);
                    commentItem.text(data[index].comment[c]);
                    commentBox.append(commentItem);
                }
                // Delete Comment (CommentID, ArticleID)
            }

            // Add Comment to MongoDB


            $(".modal-content").append(comentHeader, commentBox);
        });
    });
});

