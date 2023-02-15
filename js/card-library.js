
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
    var card_power_toughness = power_toughness_normalizer(data["power"], data["toughness"]);
    var card_price = price_normalizer(data["prices"]["eur"], data["prices"]["usd"]); //price

    //write data in the html
    $('#card-img').html("<img src="+card_img+">"); //img
    $("#card-name").html(card_name); //name
    $("#card-cost").html(card_cost); //cost
    $("#card-type").html(card_type); //type
    $("#card-text").html(card_text); //text
    $("#card-power-toughness").html(card_power_toughness); //text
    $("#card-price").html(card_price); //card prices
  });
}    
  

function symbols_change(symbol){
  symbol = symbol.replace(/{W}/g, "<i class='mi mi-mana mi-w'></i>") //white
  symbol = symbol.replace(/{U}/g, "<i class='mi mi-mana mi-u'></i>") //blue
  symbol = symbol.replace(/{B}/g, "<i class='mi mi-mana mi-b'></i>") //black
  symbol = symbol.replace(/{R}/g, "<i class='mi mi-mana mi-r'></i>") //red
  symbol = symbol.replace(/{G}/g, "<i class='mi mi-mana mi-g'></i>") //green
  symbol = symbol.replace(/{T}/g, "<i class='mi mi-tap mi-mana'></i>") //tap

  //numbers
  for (n=0; n<20; n++) {
    symbol = symbol.replace("{"+n+"}", "<i class='mi mi-mana mi-"+n+"'></i>"); //tap
  }
  
  return symbol;
}

function power_toughness_normalizer(power, toughness){
  if (power != null && toughness != null){
    var power_toughness = power+"/"+toughness;
  }else{
    var power_toughness = "";
  }
  return power_toughness;
}


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
    return "Price aprox.: "+card_price_eur+" | "+card_price_usd;
  }
}