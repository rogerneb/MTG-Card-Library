
function search_card() {

  var card_search = $('#card_search').val();


  $.getJSON("https://api.scryfall.com/cards/named?fuzzy="+card_search, function(data) {
    console.clear()  
    console.log(data);

    //simplify data
    var card_img = data["image_uris"]["png"]; //img
    var card_name = data["name"]+" "; //name
    var card_cost = data["mana_cost"] //cost
    card_cost = card_cost.replace("{U}", "<i class='mi mi-mana mi-u'></i>") //replace mana sy

    var card_type = data["type_line"] //type
    var card_text = data["oracle_text"]; //text

    if (data["prices"]["eur"] != null) {
      var card_price_eur = "~"+data["prices"]["eur"]+"€"; //eur price
      var card_price_usd = " | ~$"+data["prices"]["usd"]; //usd price
    }else{
      var card_price_eur ="Price not available."
    }

    //write data in the html
    $('#card-img').html("<img src="+card_img+">"); //img
    $("#card-name").html(card_name); //name
    $("#card-cost").html(card_cost); //cost
    $("#card-type").html(card_type); //type
    $("#card-text").html(card_text); //text
    $("#card-price-eur").html(card_price_eur); //eur price
    $("#card-price-usd").html(card_price_usd); //usd price
  });
}    
  

