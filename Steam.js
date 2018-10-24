function hitAPI() {}


function main() {
  fetch("http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=4000&count=3&maxlength=300&format=json").then(function (response) {
    response.json().then(function (r) {
      console.log(r.appnews);
    })

  })

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