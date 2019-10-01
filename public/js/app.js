$("#scrape-button").on("click", event => {
    event.preventDefault();
    $.getJSON("/scrape", data => {
        console.log(data[0].image);

        for (var i = 0; i < data.length; i++) {

            // <div class="card horizontal">
            //     <div class="card-image">
            //         <img src="https://lorempixel.com/100/190/nature/6">
            //     </div>
            //     <div class="card-stacked">
            //         <div class="card-content">
            //             <p>I am a very simple card. I am good at containing small bits of information.</p>
            //         </div>
            //         <div class="card-action">
            //             <a href="#">This is a link</a>
            //         </div>
            //     </div>
            // </div>

            // Add card to homepage div
            $("#articleContainer").append(horiCard);

        }
    });
});

// horiCard.append(imgCard, cardStacked)
//     imgCard.append(image)
//         image
//     cardStacked.append(cardContent, cardAction)
//         cardContent.append(pTag)
//             pTag
//         cardAction.append(cardLink)
//             cardLink