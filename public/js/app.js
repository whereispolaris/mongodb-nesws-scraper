$("#scrape-button").on("click", event => {
    event.preventDefault();
    $.getJSON("/scrape", data => {
        console.log(data[0].image);

        for (var i = 0; i < data.length; i++) {
            var horiCard = $("<div>");
            horiCard.addClass("card horizontal");
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
            var cardLink = $("<a>");
            cardLink.attr("href", "https://www.nytimes.com/" + data[i].link);
            cardLink.text("Save Article");

            cardAction.append(cardLink);
            cardContent.append(h3Tag, pTag);
            cardStacked.append(cardContent, cardAction);
            imgCard.append(image);
            horiCard.append(imgCard, cardStacked);

            $("#articleContainer").append(horiCard);

        }
    });
});
