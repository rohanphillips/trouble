function rollDice() {
  const dice = [...document.querySelectorAll(".die-list")];
  let roll = 0;
  dice.forEach(die => {
    toggleClasses(die);
    roll = getRandomNumber(1, 6);
    die.dataset.roll = roll;
    setTimeout(() => {  currentGame.movePiece(roll); }, 1700);
    
  });
}

function toggleClasses(die) {
  die.classList.toggle("odd-roll");
  die.classList.toggle("even-roll");
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("roll-button").addEventListener("click", rollDice);
