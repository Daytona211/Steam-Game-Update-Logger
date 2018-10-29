function addToList(item, list, liCounter) {
  var li = document.createElement("li");
  li.id = "ListItem" + liCounter;
  var p = document.createElement("p");
  var but = document.createElement("button");
  but.style.width = "30px";
  but.style.height = "30px";  
  but.addEventListener("click", function(e){
    spoilerClicked(e);
  });
  li.appendChild(but);
  lookForImg(item.contents, li);
  p.innerHTML = (item.contents);
  console.log(p);
  li.appendChild(p);
  console.log(li);
  list.appendChild(li);
}

function spoilerClicked(event){
  listOfElements = event.target.parentElement.childNodes;
  for(var i = 1; i < listOfElements.length; i++){
    if(listOfElements[i].style.display != "none")
      listOfElements[i].style.display = "none";
    else
      listOfElements[i].style.display = "block";
  }
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

function search(event){
  
}

function main() {
  var list = document.getElementById("newsOutput");
  var elementsInList = 0;
  fetch("http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=4000&count=3&maxlength=200&format=json").then(function (response) {
    response.json().then(function (r) {
      arrOfContent = r.appnews.newsitems;
      for (var i = 0; i < arrOfContent.length; i++) {
        addToList(arrOfContent[i], list, elementsInList);
        elementsInList++;
      }
    })
  });
 
  var searchButton = document.getElementById("submitButton");
  searchButton.addEventListener("click", function(event){
    search(event);
  });

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