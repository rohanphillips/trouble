
class Game{
  constructor(id){
    this.gameid = id;
    this.board = {};
    this.players = {};
    this.inProgress = false;
    this.complete = false;
  }

  newPlayer(player){
    console.log("COUNT", this.playerCount);
    if (this.playerCount < 4){
      let np = new Player(player.data.id, player.data.attributes.name, player.data.attributes.color);
      let ps = player.data.attributes.pieces;
      for (let i=0; i < ps.length; i++){
        np.pieces[i] = new Piece(ps[i].id, ps[i].piece_number, ps[i].board_location)        
      }
      this.players[this.playerCount] = np;
    }    
  }

  deletePlayerID(playerID){
    let myPointer = 0;
    for (let i=0; i < Object.keys(this.players).length; i++){
      let myPlayer = this.players[i];
      if (myPlayer.playerID === playerID){
        myPointer = i;
        delete this.players[i]
        break;
      }
    }
  }

  get playerCount(){
    return Object.keys(this.players).length;
  }

  createBoard(){
    let playerColor;
    let positionNumber = 0;
    let playerPieces;
    for (let i=0; i < 4; i++){
      console.log("TestPlayer", this.players[i])
      playerPieces = undefined;
      if (this.players[i] != undefined){
        const player = this.players[i];
        playerColor = player.color;
        playerPieces = player.pieces;
      } else {
        playerColor = randomColor();
      }
      //create start/home positions
      for (let z=0; z < 4; z++){
        const startPositionName = "p" + i + "start" + z;
        const homePositionName = "p" + i + "home" + z;
        this.board[startPositionName] = new Position("start", z, playerColor);
        if (playerPieces != undefined){
          this.board[startPositionName].piece = playerPieces[z];
        }
        this.board[homePositionName] = new Position("home", z, playerColor);
      }
      //create board positions
      for (let y=0; y < 8; y++){
        const gamePositionName = "game" + positionNumber;
        this.board[gamePositionName] = new Position("game", positionNumber, playerColor);
        myBoard(positionNumber, gamePositionName, playerColor);
        positionNumber += 1;        
      }
    }
  }
}

class Position{
  constructor(area, id, color){
    this.area = area;
    this.id = id;
    this.color = color;
    this.piece = undefined;
  }

  set updatePiece(piece){
    this.piece = piece;
  }
  get isOccupied(){
    return this.piece != undefined;
  }
}

function myBoard(position, id, color, xExtend, yExtend){
  const positions = 32;
  const startingAngle = 45;
  let height = 240 + xExtend;
  let width = 320 + yExtend;

  let angleIncrement = (Math.PI * 2) / positions;
  let x = width + (width * Math.cos(position * angleIncrement)) - 15;
  let y = height + (height * Math.sin(position * angleIncrement)) - 15;
  console.log("myBoard x", x)
  console.log("myBoard y", y)
  let board = document.getElementById("board")
  let r = document.createElement("span");
  r.id = id;
  r.className = "elipsoid";
  r.style = `top: ${y}px; left: ${x}px; background-color: ${color};`
  board.appendChild(r);
}

let randomColor = () => {
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function startNewGame(){
  console.log("Start new Game");
  newGameRequest(createNewGameObject());
}

function startGame(){
  currentGame.inProgress = true;
  toggleDisplay("start_game_button", "hidden")
  toggleDisplay("add_player_panel", "hidden");
  let bs = document.getElementsByClassName("player_button_show")
  for (let i = 0; i < bs.length; i++){
    bs[i].className = "player_button_hide"
  }
  //initalize the game
  currentGame.createBoard();
  
}

function initNewGame(game){
  toggleDisplay("new_game_button", "hidden");
  console.log("JSON Game Object", game);
  currentGame = new Game(game.data.id);
  toggleDisplay("add_player_panel", "display_inline");
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