function initialLoad() {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("The DOM has loaded");
    if (currentGame === undefined){
      // const myNewGameButton = getButton("new_game_button");
      getElement("new_game_button").addEventListener("click", () => startNewGame());
      addSubmitPreventAddPlayer();
    }
  });
}

function getElement(id){
  return document.getElementById(id);
}

function toggleDisplay(id, setting){
  let element = document.getElementById(id);
  element.style = `display: ${setting}`
}

let someErrors = undefined;

function displayAddPlayerErrors(errors){
  toggleDisplay("add_players_errors_panel", "inline")
  myList = document.getElementById("add_players_errors");
  myList.innerHTML = '';
  const keys = Object.keys(errors);
  for (i=0; i < keys.length; i++){
    myItem = document.createElement("li")
    myItem.innerHTML = keys[i] + " " + errors[keys[i]];
    myList.appendChild(myItem);
  }
}