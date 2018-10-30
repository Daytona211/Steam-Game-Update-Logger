/**
 * addToList - adds the item passed in to the UL of news
 * @param item - the news object that is to be added
 * @param list - the list that the news needs to be added to */
function addToList(item, list) {
  var li = document.createElement("li");
  li.id = "ListItem" + (list.childNodes.length - 3);
  var p = document.createElement("p");
  var but = document.createElement("button");
  but.addEventListener("click", function (e) {
    spoilerClicked(e);
  });
  var date = new Date(item.date * 1000);
  but.textContent = date.toDateString();
  li.appendChild(but);
  lookForImg(item.contents, li);
  p.innerHTML = (item.contents);
  removeLinks(p);
  li.appendChild(p);
  for (var i = 1; i < li.childNodes.length; i++) { // collapse all info
    li.childNodes[i].style.display = "none";
  }
  list.appendChild(li);
}

/**
 * spoilerClicked - handles if a spoiler button is clicked
 * @param event - details about the event that was triggered
 */
function spoilerClicked(event) {
  listOfElements = event.target.parentElement.childNodes;
  for (var i = 1; i < listOfElements.length; i++) {
    if (listOfElements[i].style.display != "none")
      listOfElements[i].style.display = "none";
    else
      listOfElements[i].style.display = "block";
  }
}

function removeLinks(li) {
  var content = li.textContent.split(' ');
  for (var i = 0; i < content.length; i++) {
    if (content[i].includes(".jpg") || content[i].includes(".png")) {
      li.textContent = (li.textContent.replace(content[i], ""));
    }
  }

}

/**
 * lookForImg - searches a given string for an image source (in pdf or jpg format) and adds it to the li
 * @param inputString - the news that we need to parse to look for images
 * @param li - the item that we would add the image too
 */
function lookForImg(inputString, li) {
  var tokens = inputString.split(" ");
  var links;
  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i].includes(".jpg") || tokens[i].includes(".png")) {
      var image = document.createElement("img");
      image.src = tokens[i];
      image.width = "500";
      li.appendChild(image);
      inputString.replace(tokens[i], "");
    }
  }
}

/**
 * search will search handle if the submitButton is clicked
 * @param event - details about the event that was triggered
 */
function search(event) {
  var appID = document.getElementById("textBoxGameSearch").value;
  var fetchRequest = "http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=" + appID + "&count=100&maxlength=999999&format=json";
  return fetchRequest;
}

/**
 * callAPI - actually calls the API with the string found by search
 * @param fetchRequest 
 */
function callAPI(fetchRequest, list) {
  emptyList(list);
  fetch(fetchRequest).then(function (response) {
    if (response.status == 403) {
      alert("403 ERROR - GAME NOT FOUND\nTry checking your input");
      return; // invalid get request
    }
    response.json().then(function (r) {
      arrOfContent = r.appnews.newsitems;
      // console.log(r.appnews);
      // var d = new Date(arrOfContent[0].date * 1000);
      for (var i = 0; i < arrOfContent.length; i++) {
        addToList(arrOfContent[i], list);
      }
    })
  });
}

/**
 * emptyList - emptis the given list of it's contents
 * @param list - the list to be emptied
 */
function emptyList(list) {
  for (var i = 1; i < list.childNodes.length; i++)
    list.innerHTML = '';
}

function main() {
  var list = document.getElementById("newsOutput");
  var searchButton = document.getElementById("submitButton");
  searchButton.addEventListener("click", function (event) {
    var fetchRequest = search(event);
    callAPI(fetchRequest, list);
  });

}
main();