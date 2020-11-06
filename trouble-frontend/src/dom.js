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