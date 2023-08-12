const category = ["Animals", "Cities", "Colors"];

const animalNames = [
  "Sheep",
  "Bear",
  "Tiger",
  "Duck",
  "Donkey",
  "Kangaroo",
  "Giraffe",
  "Monkey",
  "Elephant",
  "Fox",
];
const cityNames = [
  "London",
  "Atlanta",
  "Sydney",
  "Orlando",
  "Houston",
  "Seoul",
  "Berlin",
  "Paris",
  "Milan",
  "Phoenix",
];
const colorNames = [
  "Maroon",
  "Lime",
  "White",
  "Orange",
  "Lavender",
  "Indigo",
  "Navy",
  "Cyan",
  "Pink",
  "Purpel",
];

let selectedCategory = "";
let randomWord = "";
let clicked = [];
let result = "";
let mistakes = 0;

function selectCategory() {
  //   category = category[Math.floor(Math.random() * category.length)];
  document
    .getElementById("category")
    .querySelectorAll("button")
    .forEach((b) => {
      b.addEventListener("click", categoryHandler);
    });
}

function categoryHandler(e) {
  //Handling Visual Properties
  let category = document.getElementById("category");
  category.style.display = "none";
  category.querySelector("p").style.display = "none";
  document.getElementById("clue").querySelector("p").style.display = "block";
  document.getElementById("letters").style.display = "flex";
  document.getElementById("image").style.display = "flex";

  //Algorithm
  selectRandomWord(e.target.innerHTML);
}

function selectRandomWord(cat) {
  switch (cat) {
    case "Animals":
      randomWord = animalNames[Math.floor(Math.random() * animalNames.length)];
      break;
    case "Cities":
      randomWord = cityNames[Math.floor(Math.random() * cityNames.length)];
      break;
    case "Colors":
      randomWord = colorNames[Math.floor(Math.random() * colorNames.length)];
      break;
    default:
      break;
  }

  document.getElementById("letters").addEventListener("click", buttonHandler);
  console.log(`Keep it as a secret, but the word is "${randomWord}" ! :)`);
  setUnderScores();
}
function setUnderScores() {
  let splitedWord = randomWord.split("");
  let mappedWord = splitedWord.map((letter) =>
    clicked.indexOf(letter.toLowerCase()) >= 0 ? letter : "_"
  );
  result = mappedWord.join("");
  document.getElementById("clue").innerHTML = `<p>${result}</p>`;
  document.getElementById("clue").style.display = "block";
}

function winCheck() {
  if (randomWord === result) {
    document.getElementById("gameOver").querySelector("p").style.display =
      "block";
    document.getElementById("gameOver").querySelector("button").style.display =
      "block";
    document.getElementById("image").querySelector("img").src = "winned.png";
    document.getElementById("clue").querySelector("p").style.letterSpacing =
      "0em";
    document.getElementById("letters").style.display = "none";
  }
}

function looseCheck() {
  if (mistakes === 6) {
    document.getElementById("gameOver").querySelector("p").style.display =
      "block";
    document.getElementById("gameOver").querySelector("button").style.display =
      "block";
    document.getElementById(
      "clue"
    ).innerHTML = `<p>The word was: ${randomWord}</p>`;
    document.getElementById("clue").querySelector("p").style.letterSpacing =
      "0em";
    document.getElementById("letters").style.display = "none";
  }
}

function reset(event) {
  document.getElementById("reset").addEventListener("click", refresh);
  location.reload();
}

function reset() {
  location.reload();
}

function updatePicture() {
  const image = document.getElementById("image").querySelector("img");
  image.src = `lvl${mistakes}.png`;
}

function letterHandler(letter) {
  letter = letter.toLowerCase();
  clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
  if (letter != "letters") {
    document.getElementById(letter.toUpperCase()).className = "used";
  }

  if (
    randomWord.indexOf(letter) >= 0 ||
    randomWord.indexOf(letter.toUpperCase()) >= 0
  ) {
    setUnderScores();
    winCheck();
  } else if (randomWord.indexOf(letter) === -1 && letter != "letters") {
    mistakes++;
    if (mistakes < 7) updatePicture();
    looseCheck();
  }
}
function buttonHandler(event) {
  letterHandler(event.target.id);
}

function categorySelector(event) {
  letterHandler(event.target.id);
}

selectCategory();
