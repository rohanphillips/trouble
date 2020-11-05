function addSubmitPreventAddPlayer(){
  document.querySelector("#add_player_form").addEventListener("submit", function(event) {    
    event.preventDefault();
    addPlayer();
  }, false);
}

function addPlayer(){
  toggleDisplay("add_players_errors_panel", "none");
  let newPlayer = {}  
  newPlayer.game_id = currentGame.gameid;
  console.log("addPlayer")
  console.log(currentGame.gameid)
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
            }
          })
          .catch(function(error) {
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


function displayNewPlayer(object){
  console.log(object);
  let playerList = document.getElementById("current_player_list");
  let newPlayer = document.createElement("div")
  newPlayer.id = `p${object.data.id}`
  let name = document.createElement("div")
  name.innerText = `${object.data.attributes.name}`
  newPlayer.appendChild(name);
  let holder = document.createElement("div")
  let deleteButton = document.createElement("button")
  deleteButton.innerText = "Delete"
  deleteButton.id = `${object.data.id}`
  deleteButton.addEventListener("click", () => {
    initiateDeletePlayer(deleteButton.id, newPlayer);
  })
  holder.appendChild(deleteButton);
  newPlayer.appendChild(holder);
  playerList.appendChild(newPlayer);

}

function initiateDeletePlayer(id, element){
  console.log("will delete player " + id)
  deletePlayerRequest(id, element, createDeletePlayerObject())
}

function deletePlayerRequest(id, element, configObj){
  return fetch(PLAYERS_URL + '/' + id, configObj)
          .then(function(response) {
            return response.json();
          })
          .then(function(object) {
            if (object.message === "success"){
            console.log("delete successful")
            console.log(object.message);
            console.log(element);
            element.remove();
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