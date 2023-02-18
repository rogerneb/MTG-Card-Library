
function search_card() {
  var card_search = $('#card_search').val();
  $.getJSON("https://api.scryfall.com/cards/named?fuzzy="+card_search, function(data) {
    console.clear()  
    console.log(data);

    //simplify data
    var card_img = data["image_uris"]["png"]; //img
    var card_name = data["name"]+" "; //name
    //symbols change
    var card_cost = symbols_change(data["mana_cost"]);
    var card_type = data["type_line"] //type
    var card_text = symbols_change(data["oracle_text"]); //text
    var card_power_toughness = power_toughness_normalizer(data["power"], data["toughness"]); //power and toughness
    var card_price = price_normalizer(data["prices"]["eur"], data["prices"]["usd"]); //price
    var card_link = data["scryfall_uri"]; //scryfall URL
    //legalities
    var card_legality_standard = get_legality(data["legalities"]["standard"]);
    var card_legality_pioneer = get_legality(data["legalities"]["pioneer"]);
    var card_legality_modern = get_legality(data["legalities"]["modern"]);

    //write data in the html
    $("#error").html(""); //delete error
    $('#card-img').html("<img src="+card_img+">"); //img
    $("#card-name").html(card_name); //name
    $("#card-cost").html(card_cost); //cost
    $("#card-type").html(card_type); //type
    $("#card-text").html(card_text); //text
    $("#card-power-toughness").html(card_power_toughness); //text
    $("#card-price").html(card_price); //card prices
    $("#card-link").html("<a href="+card_link+" target='_blank' class='scryfall-link'>View it on Scryfall</a>");
    $("#card-legality-standard").html("Standard: "+card_legality_standard);
    $("#card-legality-pioneer").html("Pioneer: "+card_legality_pioneer);
    $("#card-legality-modern").html("Modern: "+card_legality_modern);

  })
  .fail(function() { //when the card doesnt exist
    $("#error").html("<img src='img/sad.png' alt='sad face'><br><span id='error-ooops'><b>Oops!</b></span><br>It looks like we can't find the card you're looking for. It may not exist. Check that you typed it correctly and try again."); //error
    //cleaning previous card info
    $('#card-img').html(""); //img
    $("#card-name").html(""); //name
    $("#card-cost").html(""); //cost
    $("#card-type").html(""); //type
    $("#card-text").html(""); //text
    $("#card-power-toughness").html(""); //text
    $("#card-price").html(""); //card prices
    $("#card-link").html(""); //scryfall button
  })
}    
  
//SYMBOLS
function symbols_change(symbol){
  symbol = symbol.replace(/{W}/g, "<i class='mi mi-mana mi-w'></i>") //white
  symbol = symbol.replace(/{U}/g, "<i class='mi mi-mana mi-u'></i>") //blue
  symbol = symbol.replace(/{B}/g, "<i class='mi mi-mana mi-b'></i>") //black
  symbol = symbol.replace(/{R}/g, "<i class='mi mi-mana mi-r'></i>") //red
  symbol = symbol.replace(/{G}/g, "<i class='mi mi-mana mi-g'></i>") //green
  symbol = symbol.replace(/{C}/g, "<i class='mi mi-mana mi-c'></i>") //C
  symbol = symbol.replace(/{T}/g, "<i class='mi mi-tap mi-mana'></i>") //tap
  symbol = symbol.replace(/{X}/g, "<i class='mi mi-mana mi-x'></i>") //X
  symbol = symbol.replace(/{Y}/g, "<i class='mi mi-mana mi-y'></i>") //Y
  symbol = symbol.replace(/{Z}/g, "<i class='mi mi-mana mi-z'></i>") //Z

  //numbers
  for (n=0; n<20; n++) {
    symbol = symbol.replace("{"+n+"}", "<i class='mi mi-mana mi-"+n+"'></i>"); //tap
  }
  
  return symbol;
}
//END SYMBOLS

//POWER
function power_toughness_normalizer(power, toughness){
  if (power != null && toughness != null){
    var power_toughness = power+"/"+toughness;
  }else{
    var power_toughness = "";
  }
  return power_toughness;
}
//END POWER

//PRICE
function price_normalizer(eur, usd) {
  //EURO
  if (eur != null) {
    var card_price_eur = "~"+eur+"€"; //eur price
  }else {
    var card_price_eur = "N/A";
  }

  //US DOLLAR
  if (usd != null) {
    var card_price_usd = "~$"+usd; //eur price
  }else{
    var card_price_usd = "N/A";
  }

  //return
  if (card_price_eur == "N/A" && card_price_usd == "N/A") {
    return "Price aprox.: N/A";
  }else{
    return "Price aprox.: <b>"+card_price_eur+"</b> | <b>"+card_price_usd+"</b>";
  }
  //END PRICE
}


//GET LEGALITIES
function get_legality(legal){
  if (legal == "not_legal") {
    return "<span class='lgl notlegal'>Not Legal</span>";
  }else if(legal == "banned"){
    return "<span class='lgl banned'>Banned</span>";
  }else if(legal == "restricted"){
    return "<span class='lgl banned'>Restricted</span>";
  }else if(legal == "legal"){
    return "<span class='lgl legal'>Legal</span>";
  }
}
//END GET LEGALITIES