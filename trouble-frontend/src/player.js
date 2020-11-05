function addSubmitPreventAddPlayer(){
  document.querySelector("#add_player_form").addEventListener("submit", function(event) {    
    event.preventDefault();
    addPlayer();
  }, false);
}

function addPlayer(){
  toggleDisplay("add_players_errors_panel", "none");
  let newPlayer = {}  
  newPlayer.game_id = currentGame.id;
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