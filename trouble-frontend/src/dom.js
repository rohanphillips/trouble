function initialLoad() {
  document.addEventListener("DOMContentLoaded", () => {
    console.log("The DOM has loaded");
    if (currentGame === undefined){
      // const myNewGameButton = getButton("new_game_button");
      getButton("new_game_button").addEventListener("click", () => startNewGame());
      getButton("add_player_button").addEventListener("click", () => addPlayer());
    }
  });
}

function getButton(id){
  return document.getElementById(id);
}