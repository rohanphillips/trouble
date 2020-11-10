const BACKEND_URL = 'http://localhost:3000';
const GAMES_URL = `${BACKEND_URL}/games`
const PLAYERS_URL = `${BACKEND_URL}/players`
let currentGame = undefined;

initialLoad();

currentGame = new Game(1);
currentGame.newPlayer(testPlayer);
currentGame.createBoard();


