
function search_card() {

  var card_search = $('#card_search').val();


  $.getJSON("https://api.scryfall.com/cards/named?exact="+card_search, function(data) {
    console.clear()  
    console.log(data);

    //simplify data
    var card_name = data["name"];
    var card_img = data["image_uris"]["small"];

    //write data in the html
    $("#card-name").html(card_name);
    $('#card-img').html("<img src="+card_img+">");
  });
}

