let currentGame = undefined;

class Game{
  constructor(id){
    this.gameid = id;
    this.players = [];
  }

  push(player){
    return this.players.push(player);
  }

  get playerCount(){
    return this.players.length;
  }
}


let piece = new Piece(1, 1, 1);
let player = new Player("rohan", "red");



function startNewGame(){
  console.log("Start new Game");
  newGameRequest(createNewGameObject());
}

function initNewGame(game){
  toggleDisplay("new_game_button", "none");
  currentGame = new Game(game.data.id);
  toggleDisplay("add_player_panel", "inherit");
}

function newGameRequest(configObj){
  return fetch(GAMES_URL, configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
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