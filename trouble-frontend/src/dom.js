function initialLoad() {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("The DOM has loaded");
    if (currentGame === undefined){
      const myNewGameButton = getNewGameButton();
      myNewGameButton.addEventListener("click", () => startNewGame());
    }
  });
}

function getNewGameButton(){
  return document.getElementById("new_game_button");
}