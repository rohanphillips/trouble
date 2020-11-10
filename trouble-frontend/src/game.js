
class Game{
  constructor(id){
    this.gameid = id;
    this.board = {};
    this.players = {};
    this.inProgress = false;
    this.complete = false;
    this.width = 900;
    this.height = 700;
    this.currentPlayer = 0;
  }

  movePiece(player, diceNumber){
    let myPlayer = this.players[player];
    let playerPieces = myPlayer.pieces;
    let pieceStartLocation = 3;
    //logic will have to be added here to decide which piece to move from start.
    let selectedPiece = playerPieces[pieceStartLocation];
    console.log("PIECE", selectedPiece)
    if (diceNumber === 6 && selectedPiece.boardLocation.includes("start")){
      console.log("will move to start");
      let startLocation = player * 8;
      let newLocation = `game${startLocation}`;
      let boardPosition = this.board[newLocation];
      //will need to check of position is open in the future
      boardPosition.piece = selectedPiece;
      this.updatePositionElement(newLocation, "elipsoid_position", myPlayer.color);
      this.updatePositionElement(selectedPiece.boardLocation, "elipsoid_board")
      selectedPiece.boardLocation = newLocation;
      //update new location to represent the new piece
    }
    this.nextPlayer(diceNumber);
  }

  updatePositionElement(location, newCSS, color){
    let element = document.getElementById(location);
    element.className = newCSS;
    if (color != undefined){
      element.style.backgroundColor = color;
    } else {
      element.style.backgroundColor = "#ffffff"
    }
  }

  nextPlayer(diceRoll){
    if (diceRoll != 6){
      if (this.currentPlayer === this.playerCount() - 1){
        this.currentPlayer = 0;
      } else {
        this.currentPlayer += 1;
      }
    }
  }

  newPlayer(player){
    if (this.playerCount() < 4){
      let np = new Player(player.data.id, player.data.attributes.name, player.data.attributes.color);
      let ps = player.data.attributes.pieces;
      for (let i=0; i < ps.length; i++){
        np.pieces[i] = new Piece(ps[i].id, ps[i].piece_number, ps[i].board_location)        
      }
      this.players[this.playerCount()] = np;
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

  playerCount(){
    return Object.keys(this.players).length;
  }

  createBoard(){
    let playerColor;
    let positionNumber = 0;
    let startCount = 0;
    let homeCount = 0;
    let playerLocation = 0;
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
      startCount = 0;
      homeCount = 0;
      playerLocation = 0;
      for (let y=0; y < 8; y++){
        const gamePositionName = "game" + positionNumber;      
        this.board[gamePositionName] = new Position("game", positionNumber, playerColor);        
        
        
        this.createLayer("board_layer", positionNumber , gamePositionName, playerColor);
        
        if (playerLocation >= 2 && playerLocation <= 5){
          this.createLayer("start_layer", positionNumber, "p" + i + "start" + startCount, playerColor);
          startCount += 1;
        }
        if (playerLocation >= 0 && playerLocation <= 3){
          this.createLayer("home_layer", positionNumber , "p" + i + "home" + homeCount, playerColor, homeCount);
          homeCount += 1;
        }
        playerLocation += 1;
        positionNumber += 1;        
      }
    }
  }
  createLayer(layer, position, id, color){
    const positions = 32;
    let height;
    let width;
    let halfWidth;
    let halfHeight;
    let top;
    let left;
    let myClass;
    const boardReducer = 100;
    const homeReducer = 150;
    
    width = this.width;
    height = this.height;
    switch (layer){
      case "start_layer":        
        halfWidth = width / 2;
        halfHeight = height / 2;
        top = 0;
        left = 0;
        myClass = "elipsoid_position";
        break;
      case "board_layer":   
        width = width - boardReducer;
        height = height - boardReducer;
        halfWidth = width / 2;
        halfHeight = height / 2;
        top = boardReducer / 2;
        left = boardReducer / 2;
        color = "#ffffff";
        myClass = "elipsoid_board";
        break;
      case "home_layer":  
        width = width - boardReducer - homeReducer;
        height = height - boardReducer - homeReducer;
        halfWidth = width / 2;
        halfHeight = height / 2;
        top = homeReducer / 2;
        left = homeReducer / 2;
        myClass = "elipsoid_home";
        break;
    }
    const modifyLayer = document.getElementById(layer);
    modifyLayer.style = `width: ${width}px; height: ${height}px; top: ${top}px; left: ${left}px;`; 
    
    let angleIncrement = (Math.PI * 2) / positions;
    let x = halfWidth + (halfWidth * Math.cos(position * angleIncrement)) - 15 ;
    let y = halfHeight + (halfHeight * Math.sin(position * angleIncrement)) - 15;
    // console.log("myBoard x", x)
    // console.log("myBoard y", y)
    let r = document.createElement("span");
    r.id = id;
    r.className = myClass;
    r.style = `top: ${y}px; left: ${x}px; background-color: ${color};`
    modifyLayer.appendChild(r);
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