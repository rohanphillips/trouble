let currentGame = undefined;

class Game{
  constructor(id){
    this.id = id;
  }
}

function addPlayer(){
  console.log("add Player")
}

function startNewGame(){
  console.log("Start new Game");
  newGameRequest(createNewGameObject());
}

function initNewGame(game){
  getButton("new_game_button").style = "display: none";
  currentGame = new Game(game.data.id);
  const myAddPlayer = document.getElementById("add_player_panel");
  myAddPlayer.style = "display: inherit"
}

function newGameRequest(configObj){
  return fetch(GAMES_URL, configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            // console.log("this is what was returned for newPokemonRequest")
            // console.log(object)
            // console.log(object.data.attributes);
            initNewGame(object);
          })
          .catch(function(error) {
            console.log(error.message);
          });
}

function createNewGameObject(){
  let myGetObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  };
  return myGetObject;
};