var gifArrayButtons = ['thor', 'hulk', 'iron man', 'captain marvel', 'spiderman'];

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

function renderGifs(gifs) {
    for (i = 0; i < gifs.length; i++) {
        var gif = gifs[i];

        var gifHolder = `
        `
    }
}

function grabGiphy (searchValue) {
    var url = endpoint + "&q=" + searchValue;
    
    $.ajax({ url })
        .then(function(response) {
            var gifs = response.data;
            renderGifs(gifs);
            console.log("Data: ", data);
        })
        .catch(function(error) {
            console.log("Data: ", data);
        });
}

function searchGiphy(event) {
    event.preventDefault();
    
    var searchValue = $("#search").val().trim();

    addButton(searchValue);

    grabGiphy(searchValue);

    console.log("Value: ", searchValue);
};

$(document).on("click", ".btn-delete", deleteButton);

$("#submit-button").on("click", searchGiphy);