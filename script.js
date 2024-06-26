// get the game container element fro dom 
const gameContainer = document.getElementById("game");
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

// array of colors for each game card , color repeated twice 
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let firstCard = null; // var to store the first card clicked 
let secondCard = null; // var to store second card clicked
let canFlip = true; // flag to track if cards can be flipped 

// helper function to shuiffle an array using fisher-yates algor
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array to shuffle
  while (counter > 0) {
    // Pick a random index from remaining elements
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // swap the curr element with randomly chosen element
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  // returns shuffled array
  return array;
}

// shuffle the colors arrau and store the shuffled resu in a var
let shuffledColors = shuffle(COLORS);

// func to create divs for each color in shuffledCOlors arr
function createDivsForColors(colorArray) {
  // clear the game container 
  gameContainer.innerHTML = '';
  
  // loop through each color in colorArray
  for (let color of colorArray) {
    // creates a new div element fopr each color
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // check if card flipping is currently allowed
  if (!canFlip) {
    // prevents further card flips if alrerady flipping or matching
    return;  
  }

  const clickedDiv = event.target;

  // ignores clicked on already matched cards
  if (clickedDiv.classList.contains('matched')){
    return;
  }

  // toggle the background color of the clicked div to show the color
  clickedDiv.style.backgroundColor = clickedDiv.classList[0];

  // determine which card (first or second) is being clicked based on curr state
  if(!firstCard){
    firstCard = clickedDiv; // assign the first clicked card
  } 
  else if (!secondCard) {
    secondCard = clickedDiv; // assign the second clicked card

    // checks if the color of first and second card match
    if (firstCard.classList[0] === secondCard.classList[0]) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
    }

    // reset first and second card after a short delay
    setTimeout(() => {
      // checks if cards are matched before resetting backgroun coolor
      if (!firstCard.classList.contains('matched')){
        firstCard.style.backgroundColor = '';
      }
      if (!secondCard.classList.contains('matched')){
        secondCard.style.backgroundColor = '';
      }

      // reset first card adn second card var
      firstCard = null;
      secondCard = null;
      canFlip = true; // allow flipping again after cards are reset
    }, 1000);

    canFlip = false; // prevents futher card flips until current ones are resolved
  }
}
startButton.addEventListener('click', function(){
  gameContainer.style.display = 'block';
  startButton.style.display = 'none'; // hides start button
  restartButton.style.display = 'inline'; // show restart button
  createDivsForColors(shuffledColors);
});

restartButton.addEventListener('click', function(){
  shuffledColors = shuffle(COLORS); // reshuffle colors
  createDivsForColors(shuffledColors); // recreate the divs
  firstCard = null; // reset first card
  secondCard = null; // reset second card
  canFlip = true; // allow flipping again
}); 