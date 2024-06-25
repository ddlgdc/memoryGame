// get the game container element fro dom 
const gameContainer = document.getElementById("game");

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
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);

  // const var determines which div(card) was clicked using event.target
  const clickedDiv = event.target;
  // change the color of card clicked to its classname (color)
  clickedDiv.style.backgroundColor = clickedDiv.classList[0];
}

// when the DOM loads
document.addEventListener('DOMContentLoaded', function() {
  createDivsForColors(shuffledColors);
});