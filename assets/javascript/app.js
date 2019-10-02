var gifArrayButtons = ['Thor', 'Hulk', 'Captain Marvel', 'Spiderman', 'Thanos', 'Black Widow'];

var keyAPI = "zWPDG6GOC1W2I1tVDf5bZiuTNNq4RnHe"; 

var endpoint = "http://api.giphy.com/v1/gifs/search?api_key=zWPDG6GOC1W2I1tVDf5bZiuTNNq4RnHe&limit=10";

function renderButtons() {

    $(".recent-search").empty();

    for(i = 0; i < gifArrayButtons.length; i++) {
        var buttons = gifArrayButtons[i];
        var button = `
        <div class="wrap-buttons">
            <button class="btn btn-search" data-name="${buttons}">${buttons}</button>
            <button data-name="${buttons}" data-index="${i}" class="btn btn-delete fas fa-times"></button>
        </div>
        `;

        $(".recent-search").append(button); 
    }

    localStorage.setItem("gifArrayButtons", JSON.stringify());

}

renderButtons();

function deleteButton() {
    var buttonIndex = $(this).attr("data-index");
    gifArrayButtons.splice(buttonIndex, 1);
    renderButtons();
}

function addButton(searchValue) {
    gifArrayButtons.push(searchValue);

    renderButtons();
}

function makeGifHolder(gif) {

    var images = gif.images;
    var holder = `
    <div class="giphy">
        <i data-id="${gif.id}">
        <div class="giphy-image">
            <img 
                src="${images.original_still.url}" 
                data-still="${images.original_still.url}" 
                data-animate="${images.original.url}" 
                data-state="still">
        </div>
        <div class="giphy-info">
            <p>Rating: g</p>
        </div>
    </div>
    `;

    return holder;
}

function renderGifs(gifs) {

    $(".gifs-display").empty();

    for (i = 0; i < gifs.length; i++) {
        var gif = gifs[i];
        var gifHolder = makeGifHolder(gif);
        $(".gifs-display").append(gifHolder);
    }
}

function grabGiphy (searchValue) {
    var url = endpoint + "&q=" + searchValue;
    
    $.ajax({ url })
        .then(function(response) {
            var gifs = response.data;
            renderGifs(gifs);
            console.log("Gifs: ", gifs);
        })
        .catch(function(error) {
            console.log("Error: ", erros);
        });
}

function searchGiphy(event) {
    event.preventDefault();
    
    var searchValue = $("#search").val().trim();

    addButton(searchValue);

    grabGiphy(searchValue);

    console.log("Value: ", searchValue);
};

function imgClick() {
    var gifCard = $(this);

    var img = gifCard.find("img");
    var playIcon = gifCard.find("i");

    var still = img.attr("data-still");
    var animate = img.attr("data-animate");
    var state = img.attr("data-state");

    if (state === "still") {
        img.attr({
            src: animate,
            "data-state": "animate"
        });
    }
    else {
        img.attr({
            src: still,
            "data-state": "still"
        })
    }

}

function searchGifButton() {
    var buttonName = $(this).attr("data-name");
    grabGiphy(buttonName);
}

$(document).on("click", ".btn-delete", deleteButton);
$(document).on("click", ".giphy-image", imgClick);
$(document).on("click", ".btn-search", searchGifButton);

$("#submit-button").on("click", searchGiphy);