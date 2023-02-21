
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
    var card_legality_legacy = get_legality(data["legalities"]["legacy"]);
    var card_legality_vintage = get_legality(data["legalities"]["vintage"]);
    var card_legality_commander = get_legality(data["legalities"]["commander"]);
    var card_legality_alchemy = get_legality(data["legalities"]["alchemy"]);
    var card_legality_explorer = get_legality(data["legalities"]["explorer"]);
    var card_legality_brawl = get_legality(data["legalities"]["brawl"]);
    var card_legality_historic = get_legality(data["legalities"]["historic"]);
    var card_legality_pauper = get_legality(data["legalities"]["pauper"]);
    var card_legality_penny = get_legality(data["legalities"]["penny"]);

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
    $("#card-legality-standard").html("<span>Standard:</span> "+card_legality_standard);
    $("#card-legality-pioneer").html("<span>Pioneer:</span> "+card_legality_pioneer);
    $("#card-legality-modern").html("<span>Modern:</span> "+card_legality_modern);
    $("#card-legality-legacy").html("<span>Legacy:</span> "+card_legality_legacy);
    $("#card-legality-vintage").html("<span>Vintage:</span> "+card_legality_vintage);
    $("#card-legality-commander").html("<span>Commander:</span> "+card_legality_commander);
    $("#card-legality-alchemy").html("<span>Alchemy:</span> "+card_legality_alchemy);
    $("#card-legality-explorer").html("<span>Explorer:</span> "+card_legality_explorer);
    $("#card-legality-brawl").html("<span>Brawl:</span> "+card_legality_brawl);
    $("#card-legality-historic").html("<span>Historic:</span> "+card_legality_historic);
    $("#card-legality-pauper").html("<span>Pauper:</span> "+card_legality_pauper);
    $("#card-legality-penny").html("<span>Penny:</span> "+card_legality_penny);

    //back to top
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

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
    //clean legalities
    $("#card-legality-standard").html("");
    $("#card-legality-pioneer").html("");
    $("#card-legality-modern").html("");
    $("#card-legality-legacy").html("");
    $("#card-legality-vintage").html("");
    $("#card-legality-commander").html("");
    $("#card-legality-alchemy").html("");
    $("#card-legality-explorer").html("");
    $("#card-legality-brawl").html("");
    $("#card-legality-historic").html("");
    $("#card-legality-pauper").html("");
    $("#card-legality-penny").html("");

    //back to top
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  })
}    
  
//SYMBOLS
function symbols_change(symbol){
  //colors
  symbol = symbol.replace(/{W}/g, "<i class='mi mi-mana mi-w'></i>") //white
  symbol = symbol.replace(/{U}/g, "<i class='mi mi-mana mi-u'></i>") //blue
  symbol = symbol.replace(/{B}/g, "<i class='mi mi-mana mi-b'></i>") //black
  symbol = symbol.replace(/{R}/g, "<i class='mi mi-mana mi-r'></i>") //red
  symbol = symbol.replace(/{G}/g, "<i class='mi mi-mana mi-g'></i>") //green
  symbol = symbol.replace(/{C}/g, "<i class='mi mi-mana mi-c'></i>") //Colorless
  symbol = symbol.replace(/{S}/g, "<i class='mi mi-mana mi-s'></i>") //Snow
  //tap untap xyz
  symbol = symbol.replace(/{T}/g, "<i class='mi mi-tap mi-mana'></i>") //tap
  symbol = symbol.replace(/{Q}/g, "<i class='mi mi-untap mi-mana'></i>") //untap
  symbol = symbol.replace(/{X}/g, "<i class='mi mi-mana mi-x'></i>") //X
  symbol = symbol.replace(/{Y}/g, "<i class='mi mi-mana mi-y'></i>") //Y
  symbol = symbol.replace(/{Z}/g, "<i class='mi mi-mana mi-z'></i>") //Z
  //phyrexian mana
  symbol = symbol.replace(/{W\/P}/g,  "<i class='mi mi-p mi-mana-w'></i>") //white
  symbol = symbol.replace(/{U\/P}/g,  "<i class='mi mi-p mi-mana-u'></i>") //blue
  symbol = symbol.replace(/{B\/P}/g,  "<i class='mi mi-p mi-mana-b'></i>") //black
  symbol = symbol.replace(/{R\/P}/g,  "<i class='mi mi-p mi-mana-r'></i>") //red
  symbol = symbol.replace(/{G\/P}/g,  "<i class='mi mi-p mi-mana-g'></i>") //green
  symbol = symbol.replace(/{C\/P}/g,  "<i class='mi mi-p mi-mana-c'></i>") //Colorless
  //split mana
  symbol = symbol.replace(/{W\/U}/g,  "<div class='mi-split'><i class='mi mi-w'></i><i class='mi mi-u'></i></div>") //white/blue
  symbol = symbol.replace(/{W\/B}/g,  "<div class='mi-split'><i class='mi mi-w'></i><i class='mi mi-b'></i></div>") //white/black
  symbol = symbol.replace(/{U\/B}/g,  "<div class='mi-split'><i class='mi mi-u'></i><i class='mi mi-B'></i></div>") //Blue/Black
  symbol = symbol.replace(/{U\/R}/g,  "<div class='mi-split'><i class='mi mi-u'></i><i class='mi mi-r'></i></div>") //Blue/Red
  symbol = symbol.replace(/{B\/R}/g,  "<div class='mi-split'><i class='mi mi-b'></i><i class='mi mi-r'></i></div>") //black/Red
  symbol = symbol.replace(/{B\/G}/g,  "<div class='mi-split'><i class='mi mi-b'></i><i class='mi mi-g'></i></div>") //black/Red
  symbol = symbol.replace(/{R\/G}/g,  "<div class='mi-split'><i class='mi mi-r'></i><i class='mi mi-g'></i></div>") //red/green
  symbol = symbol.replace(/{R\/W}/g,  "<div class='mi-split'><i class='mi mi-r'></i><i class='mi mi-w'></i></div>") //red/white
  symbol = symbol.replace(/{G\/W}/g,  "<div class='mi-split'><i class='mi mi-g'></i><i class='mi mi-w'></i></div>") //green/white
  symbol = symbol.replace(/{G\/U}/g,  "<div class='mi-split'><i class='mi mi-g'></i><i class='mi mi-u'></i></div>") //green/blue
  //Monocolored Hybrid
  symbol = symbol.replace(/{2\/W}/g,  "<div class='mi-split'><i class='mi mi-2'></i><i class='mi mi-w'></i></div>") //2white
  symbol = symbol.replace(/{2\/U}/g,  "<div class='mi-split'><i class='mi mi-2'></i><i class='mi mi-u'></i></div>") //2blue
  symbol = symbol.replace(/{2\/B}/g,  "<div class='mi-split'><i class='mi mi-2'></i><i class='mi mi-b'></i></div>") //2black
  symbol = symbol.replace(/{2\/R}/g,  "<div class='mi-split'><i class='mi mi-2'></i><i class='mi mi-r'></i></div>") //2red
  symbol = symbol.replace(/{2\/G}/g,  "<div class='mi-split'><i class='mi mi-2'></i><i class='mi mi-g'></i></div>") //2green
  
  //numbers
  for (n=0; n<20; n++) {
    symbol = symbol.replace("{"+n+"}", "<i class='mi mi-mana mi-"+n+"'></i>"); //I must upgrade this regular expression...
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
    return "<span class='lgl restricted'>Restricted</span>";
  }else if(legal == "legal"){
    return "<span class='lgl legal'>Legal</span>";
  }
}
//END GET LEGALITIES

//CLOSE APP
function close_app() {
  alert("not implemented yet...");
}