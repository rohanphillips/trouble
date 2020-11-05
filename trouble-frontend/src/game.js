let currentGame = undefined;

class Game{
  constructor(id){
    this.id = id;
  }
}

function addSubmitPreventAddPlayer(){
  document.querySelector("#add_player_form").addEventListener("submit", function(event) {    
    event.preventDefault();
    addPlayer();
  }, false);
}

function addPlayer(){
  console.log("add Player")
  console.log(document.getElementById("player_name_input").value)
  console.log(document.getElementById("player_color_input").value)
  let newPlayer = {}
  newPlayer.game_id = currentGame.id;
  newPlayer.player_name = document.getElementById("player_name_input").valuel
  newPlayer.player_color = document.getElementById("player_color_input").value;
  newPlayerRequest(createNewPlayerObject(newPlayer));
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

function newPlayerRequest(configObj){
  return fetch(GAMES_URL, configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            // console.log("this is what was returned for newPokemonRequest")
            // console.log(object)
            // console.log(object.data.attributes);
          })
          .catch(function(error) {
            console.log(error.message);
          });
}
function createNewPlayerObject(newPlayer){
  let myGetObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newPlayer)
  };
  return myGetObject;
};

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