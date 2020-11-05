function initialLoad() {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("The DOM has loaded");
    if (currentGame === undefined){
      // const myNewGameButton = getButton("new_game_button");
      getButton("new_game_button").addEventListener("click", () => startNewGame());
      addSubmitPreventAddPlayer();
    }
  });
}

function getButton(id){
  return document.getElementById(id);
}