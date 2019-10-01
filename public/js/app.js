$("#scrape-button").on("click", event => {
    event.preventDefault();
    $.getJSON("/scrape", data => {
        console.log(data[0].image);

        for (var i = 0; i < data.length; i++) {
            var parentDiv = $("<div>");
            parentDiv.addClass("col s12 m6");
            var horiCard = $("<div>");
            horiCard.addClass("card horizontal");
            var imgCard = $("<div>");
            imgCard.addClass("card-image");
            var img = $("<img>");
            img.attr("src", data[i].image);
            imgCard.append(img);
            horiCard.append(imgCard);


            var stackCard = $("<div>");
            stackCard.addClass("card-stacked")
            var cardContent = $("<div>");
            cardContent.addClass("card-content")
            var desc = $("<p>");
            desc.text(data[i].summary);


            var cardAction = $("div");
            cardAction.addClass("card-action");

            var articleLink = $("<a>");
            articleLink.attr("href", data[i].link);
            articleLink.text("Save Article");

            cardContent.append(desc);
            stackCard.append(cardContent);
            // cardAction.append(articleLink);
            // stackCard.append(cardAction);
            parentDiv.append(horiCard);




            // Add card to homepage div
            $("#articleContainer").append(parentDiv);


        }

        // <div class="col s12 m6">
        //     <div class="card horizontal">
        //         <div class="card-image">
        //             <img src="https://lorempixel.com/190/190/nature/6">
        //     </div>
        //             <div class="card-stacked">
        //                 <div class="card-content">
        //                     <p>DESC</p>
        //                 </div>
        //                 <div class="card-action">
        //                     <a href="#">Save Article</a>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>


    })
});
