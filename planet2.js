let flippedCards = [];
let progress = 0;
let attempts = 0;
const main = document.querySelector("main");

const newGameBtn = document.querySelector("#new-game-btn");

//create game board

// card images
let images = [
  { imageUrl: "images/planet1.png", id: 1 },
  { imageUrl: "images/planet2.png", id: 2 },
  { imageUrl: "images/planet3.png", id: 3 },
  { imageUrl: "images/planet4.png", id: 4 },
  { imageUrl: "images/planet5.png", id: 5 },
  { imageUrl: "images/planet6.png", id: 6 },
  { imageUrl: "images/planet7.png", id: 7 },
  { imageUrl: "images/planet8.png", id: 8 },
  { imageUrl: "images/planet1-copy.png", id: 1 },
  { imageUrl: "images/planet2-copy.png", id: 2 },
  { imageUrl: "images/planet3-copy.png", id: 3 },
  { imageUrl: "images/planet4-copy.png", id: 4 },
  { imageUrl: "images/planet5-copy.png", id: 5 },
  { imageUrl: "images/planet6-copy.png", id: 6 },
  { imageUrl: "images/planet7-copy.png", id: 7 },
  { imageUrl: "images/planet8-copy.png", id: 8 },
];

let imagesRefill = [
  { imageUrl: "images/planet1.png", id: 1 },
  { imageUrl: "images/planet2.png", id: 2 },
  { imageUrl: "images/planet3.png", id: 3 },
  { imageUrl: "images/planet4.png", id: 4 },
  { imageUrl: "images/planet5.png", id: 5 },
  { imageUrl: "images/planet6.png", id: 6 },
  { imageUrl: "images/planet7.png", id: 7 },
  { imageUrl: "images/planet8.png", id: 8 },
  { imageUrl: "images/planet1-copy.png", id: 1 },
  { imageUrl: "images/planet2-copy.png", id: 2 },
  { imageUrl: "images/planet3-copy.png", id: 3 },
  { imageUrl: "images/planet4-copy.png", id: 4 },
  { imageUrl: "images/planet5-copy.png", id: 5 },
  { imageUrl: "images/planet6-copy.png", id: 6 },
  { imageUrl: "images/planet7-copy.png", id: 7 },
  { imageUrl: "images/planet8-copy.png", id: 8 },
];

newGameBtn.addEventListener("click", function generateGameBoard() {
  if (images.length === 0) {
    images = [...imagesRefill];
  }
  //   delete previous board if there is one
  const oldBoard = document.querySelector("#game-board");
  if (oldBoard) {
    oldBoard.remove();
    progress = 0;
  }
  //create new game board
  const gameBoard = document.createElement("div");
  gameBoard.setAttribute("id", "game-board");

  //generate cards
  while (images.length > 0) {
    let random = Math.random() * images.length;
    random = Math.floor(random);
    const image = images.splice(random, 1)[0];

    generateCards(image);
  }

  function generateCards(image) {
    const card = document.createElement("div");
    const cover = document.createElement("div");
    cover.classList.add("cover");
    card.appendChild(cover);
    card.classList.add("card");

    card.style.backgroundImage = `url(${image.imageUrl})`;
    card.style.backgroundSize = "cover";
    card.setAttribute("id", `${image.id}`);

    //this variable(gameBoard) must exist for this function to work
    gameBoard.appendChild(card);
  }

  main.appendChild(gameBoard);

  gameBoard.addEventListener("click", function flipAndCheck(event) {
    if (event.target.className === "cover") {
      const card1 = event.target.parentElement;
      card1.firstChild.style.backgroundColor = "transparent";
      card1.firstChild.setAttribute("class", "faceup");
      flippedCards.push(card1);

      if (flippedCards.length === 2) {
        gameBoard.removeEventListener("click", flipAndCheck);
        if (flippedCards[0].id === flippedCards[1].id) {
          progress += 1;
          attempts += 1;
          console.log(
            "Match!",
            "Progress:",
            progress + "/8",
            "attempts: " + attempts
          );
          if (progress === 8) {
            newGameBtn.textContent = "Reset";
            progress = 0;
          }
          flippedCards = [];
          gameBoard.addEventListener("click", flipAndCheck);
        } else {
          attempts += 1;
          console.log("no match", "attemps: " + attempts);

          setTimeout(() => {
            flippedCards[0].firstChild.style.backgroundColor = "#1a1c25";

            flippedCards[0].firstChild.setAttribute("class", "cover");

            flippedCards[1].firstChild.style.backgroundColor = "#1a1c25";

            flippedCards[1].firstChild.setAttribute("class", "cover");

            flippedCards = [];
            gameBoard.addEventListener("click", flipAndCheck);
          }, 500);
        }
      }
    }
  });
});
