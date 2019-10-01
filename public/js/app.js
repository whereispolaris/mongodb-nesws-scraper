$("#scrape-button").on("click", event => {
    event.preventDefault();
    $.getJSON("/scrape", data => {
        console.log(data);
    })
})