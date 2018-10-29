function addToList(item, list) {
  var li = document.createElement("li");
  var p = document.createElement("p");
  lookForImg(item.contents, li);
  p.innerHTML = (item.contents);
  console.log(p);
  li.appendChild(p);
  list.appendChild(li);
}

function lookForImg(inputString, li){
  var tokens = inputString.split(" ");
  var links;
  for(var i = 0; i < tokens.length; i++){
    if(tokens[i].includes(".jpg") || tokens[i].includes(".png")){
      var image = document.createElement("img");
      image.src = tokens[i];
      image.width = "500";
      li.appendChild(image);
      inputString.replace(tokens[i], "");
    }
      
  }
  
}

function main() {
  var list = document.getElementById("newsOutput");
  fetch("http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=4000&count=3&maxlength=500&format=json").then(function (response) {
    response.json().then(function (r) {
      console.log(r);
      arrOfContent = r.appnews.newsitems;
      for (var i = 0; i < arrOfContent.length; i++) {
        addToList(arrOfContent[i], list);
      }
    })
  })
  // console.log(list);

}
main();


/* fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(JSON.stringify(myJson));
  }); */

// var user = new SteamApi.User('steam-api-key', optionalSteamId);
// var userStats = new SteamApi.UserStats('steam-api-key', optionalSteamId);
// var news = new SteamApi.News('steam-api-key');
// var app = new SteamApi.App('steam-api-key');
// var player = new SteamApi.Player('steam-api-key', optionalSteamId);
// var inventory = new SteamApi.Inventory('steam-api-key', optionalSteamId);
// var items = new SteamApi.Items('steam-api-key', optionalSteamId);

// // Steam API Backpack
// items.GetPlayerItems(appId, optionalSteamId).done(function(result){
//   console.log(result);
// });