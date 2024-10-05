// if first time playing only show start option otherwise show start from previous game
function checkStorage() {
    if (typeof(Storage) !== "undefined") {

        // Previous game button
        const previousGame = document.getElementsByClassName("previousGame");

        // If first time playing 
        if (localStorage.getItem("previousSave") !== "true") {
            previousGame[0].classList.add("d-none");
        }
        // if previous game exists
        else {
            console.log("Previous game exists");
            previousGame[0].classList.remove("d-none");
            // localStorage.removeItem("previousSave");
            // localStorage.removeItem("previousSaveArray");
        }
    }
    else {
        console.log('No Support')
    }
}

// Displaying buttons
const loginButtons = document.getElementsByClassName("login");
const difficultyButtons = document.getElementsByClassName("difficulty");
const game = document.getElementsByClassName("game");
const saveButton = document.getElementsByClassName("save");

function startGame() {
    loginButtons[0].classList.add("d-none");
    difficultyButtons[0].classList.remove("d-none");
}

function startPreviousGame() {
    // Hide login buttons and show game and save button
    loginButtons[0].classList.add("d-none");
    game[0].classList.remove("d-none");
    saveButton[0].classList.remove("d-none");

    let previousGameSave = JSON.parse(localStorage.getItem("previousSaveArray"));
    
    var images = document.querySelectorAll('#gameTable img');
    // Assign the randomly shuffled array to the image table
    images.forEach((img, index) => {
        img.src = previousGameSave[index];
    })
}

// When one of the difficulty buttons are picked set the shuffle number to the number corresponding to the difficulty
function selectDifficulty(difficulty) {

    let shuffleNum = 0;

    switch (difficulty) {
        case 'easy':
            shuffleNum = 1;
            console.log("Easy");
            break;
        
        case 'medium':
            shuffleNum = 2;
            console.log("Medium");
            break;

        default:
            shuffleNum = 3
            console.log("Hard");
            break;
    }

    // Hide difficulty buttons once clicked
    difficultyButtons[0].classList.add("d-none");

    shuffleGame(shuffleNum);
}

// Start game by shuffling image
function shuffleGame(shuffleNum) {

    let imgArray = ["./images/p1.png", "./images/p2.png", "./images/p3.png", "./images/p4.png", "./images/p5.png", "./images/p6.png",
         "./images/p7.png", "./images/p8.png"];

    for (let i = 0; i < shuffleNum; i++) {
        shuffleArray(imgArray);
        console.log("Shuffle:", i);
    }

    var images = document.querySelectorAll('#gameTable img');

    // Assign the randomly shuffled array to the image table
    images.forEach((img, index) => {
        img.src = imgArray[index];
        if (index == 8) {
            img.src = "";
        }
    })


    game[0].classList.remove("d-none");
    saveButton[0].classList.remove("d-none");

}

function shuffleArray(array) {
    for (let i = array.length - 1; i >= 0; i --) {
        const j = Math.floor(Math.random() * (i + 1))
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// save game option
function saveGame() {
    localStorage.setItem("previousSave", "true");

    var images = document.querySelectorAll('#gameTable img');
    let arrayImages = []
    images.forEach((img) => {
        let newImg = img.src.split('/').pop();
        if (newImg === 'index.html') {
            arrayImages.push("");
        }
        else {
            arrayImages.push("./images/" + newImg);
        }
    })

    localStorage.setItem("previousSaveArray", JSON.stringify(arrayImages));

    const previousGame = document.getElementsByClassName("previousGame");

    loginButtons[0].classList.remove("d-none");
    previousGame[0].classList.remove("d-none");
    game[0].classList.add("d-none");
    saveButton[0].classList.add("d-none");
}

let dragged = null;

// Drag and Drop API
function drop(ev) {
    ev.preventDefault();
    target = ev.target;

    if(checkAdjacent(dragged, target)) {
        swapBoxes(dragged, target);
    }
    
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    dragged = ev.target;
    console.log(dragged.src);
}

// Returns the index of the image in the table if found
function getImageIndex(image) {
    var images = document.querySelectorAll('#gameTable img');
    for(let i = 0; i < images.length; i++) {
        if (images[i] === image) {
            return i; // Gets index of image in table
        }
    }

    return -1; // Not found
}

//TODO Check if selected item is adjacent to empty tile
function checkAdjacent(selected, target) {
    
    const selectedIndex = getImageIndex(selected);
    const targetIndex = getImageIndex(target.firstElementChild);

    if (selectedIndex === -1 || targetIndex === -1) {
        return false;
    }

    const selectedRow = Math.floor(selectedIndex / 3);
    const selectedCol = selectedIndex % 3;
    const targetRow = Math.floor(targetIndex / 3);
    const targetCol = targetIndex % 3;

    // Check if the tiles are adjacent (same row, next column or same column, next row)
    const isAdjacent = (selectedRow === targetRow && Math.abs(selectedCol - targetCol) === 1) || (selectedCol === targetCol && Math.abs(selectedRow - targetRow) === 1);    

    return isAdjacent;

}

const newGameButton = document.getElementsByClassName('new')

// If selected item is adjacent swap the two tiles.
function swapBoxes(selected, target) {

    // Updates image array
    if(selected.src != target.src) {
        temp = target.firstElementChild.src;
        target.firstElementChild.src = selected.src;
        selected.src = "";
    }
    
    if(checkGameComplete()) {
        setTimeout(function() {
            alert("Congratulations! You have completed the game!");
            newGameButton[0].classList.remove("d-none");
            saveButton[0].classList.add("d-none");
        }, 2000);
        const finalBox = document.getElementById('box9');
        finalBox.src = "./images/p9.png";
    }

    
}

const finishOrder = [
    "p1.png",
    "p2.png",
    "p3.png",
    "p4.png",
    "p5.png",
    "p6.png",
    "p7.png",
    "p8.png",
    ""
];

function checkGameComplete() {
    
    let images = document.querySelectorAll('#gameTable img');
    for(let i = 0; i < images.length - 1; i++) {
        let finalImage = images[i].src.split('/').pop();
        if (finalImage !== finishOrder[i]) {
            return false;  // As soon as one image is out of place, return false
        }
    }
    return true;
}

function resetGame() {
    loginButtons[0].classList.remove("d-none");
    game[0].classList.add("d-none");
    saveButton[0].classList.add("d-none");
    const previousGame = document.getElementsByClassName("previousGame");
    previousGame[0].classList.add("d-none");
    newGameButton[0].classList.add("d-none");

    // Reset saves
    localStorage.removeItem("previousSave");
    localStorage.removeItem("previousSaveArray");
}