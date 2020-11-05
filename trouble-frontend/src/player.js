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
  newPlayer.player_name = document.getElementById("player_name_input").value
  newPlayer.player_color = document.getElementById("player_color_input").value;
  newPlayerRequest(createNewPlayerObject(newPlayer));
}

function newPlayerRequest(configObj){
  return fetch(PLAYERS_URL, configObj)
          .then(function(response) {
            console.log("send request");
            return response.json();
          })
          .then(function(object) {
            console.log(object);
            if (object.errors){
              console.log("errors occurred")
            } else {
              console.log("new player successful")
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