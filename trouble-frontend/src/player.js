class Player {
  constructor(id, name, color){
    this.playerID = id;
    this.name = name;
    this.color = color;
    this.pieces = {};
  } 

  get pieceList(){
    return this.pieces;
  }
}

class Piece {
  constructor(id, pieceNumber, boardLocation){
    this.pieceID = id;
    this.pieceNumber = pieceNumber;
    this.boardLocation = boardLocation;    
  }
}

function addSubmitPreventAddPlayer(){
  document.querySelector("#add_player_form").addEventListener("submit", function(event) {    
    event.preventDefault();
    addPlayer();
  }, false);
}

function addPlayer(){
  toggleDisplay("add_players_errors_panel", "hidden");
  let newPlayer = {}  
  newPlayer.game_id = currentGame.gameid;
  newPlayer.player_name = document.getElementById("player_name_input").value
  newPlayer.player_color = document.getElementById("player_color_input").value;
  newPlayerRequest(createNewPlayerObject(newPlayer));
}

function newPlayerRequest(configObj){
  return fetch(PLAYERS_URL, configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            if (object.errors){
              displayAddPlayerErrors(object.errors);
            } else {
              displayNewPlayer(object);
              saveNewPlayer(object);
              let myInput = document.getElementById("player_name_input")
              myInput.value = "";
              myInput.focus();
              
              if (currentGame.playerCount === 4){
                toggleDisplay("add_player_panel", "hidden");
              }              
              toggleDisplay("current_players_panel", "display_inline");
              toggleDisplay("start_game_button", "display_inline");
            }
          })
          .catch(function(error) {
          });
}

function createNewPlayerObject(newPlayer){  
  // console.log("CONSOLE", JSON.stringify(newPlayer))
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

function saveNewPlayer(object){
  console.log("saveNewPlayer", object)
  currentGame.newPlayer(object);
}


function displayNewPlayer(object){
  let playerList = document.getElementById("current_player_list");
  let newPlayer = document.createElement("div")
  newPlayer.id = `p${object.data.id}`
  newPlayer.className = "player_row"
  let name = document.createElement("div")
  name.innerText = `${object.data.attributes.name}`
  name.style.color = object.data.attributes.color;
  name.className = "display_inline"
  newPlayer.appendChild(name);
  let holder = document.createElement("div")
  holder.className = "display_inline"
  let deleteButton = document.createElement("button")
  deleteButton.innerText = "Delete"
  deleteButton.className = "player_button_show";
  deleteButton.id = `${object.data.id}`
  deleteButton.addEventListener("click", () => {
    initiateDeletePlayer(deleteButton.id, newPlayer);
  })
  holder.appendChild(deleteButton);
  newPlayer.appendChild(holder);
  playerList.appendChild(newPlayer);
}

function initiateDeletePlayer(id, element){
  deletePlayerRequest(id, element, createDeletePlayerObject())
}

function deletePlayerRequest(id, element, configObj){
  return fetch(PLAYERS_URL + '/' + id, configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            if (object.message === "success"){
              element.remove();
              currentGame.deletePlayerID(id)
              if (currentGame.playerCount < 4){
                toggleDisplay("add_player_panel", "display_inline");
              }
            }
          })
          .catch(function(error) {
          });
}

function createDeletePlayerObject(){
  let myGetObject = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
  };
  return myGetObject;
};

function displayAddPlayerErrors(errors){
  toggleDisplay("add_players_errors_panel", "display_inline")
  myList = document.getElementById("add_players_errors");
  myList.innerHTML = '';
  const keys = Object.keys(errors);
  for (let i=0; i < keys.length; i++){
    myItem = document.createElement("li")
    myItem.innerHTML = keys[i] + " " + errors[keys[i]];
    myList.appendChild(myItem);
  }
}