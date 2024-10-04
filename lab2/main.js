// if first time playing only show start option otherwise show start from previous game
function checkStorage() {
    if (typeof(Storage) !== "undefined") {

        const previousGame = document.getElementsByClassName("previousGame");

        // If first time playing 
        if (localStorage.getItem("previousSave") !== "true") {
            previousGame[0].style.display = "none";
        }
        // if previous game exists
        else {
            console.log("Previous game exists");
            previousGame[0].style.display = "block";
            // localStorage.removeItem("previousSave");
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
    loginButtons[0].style.display = "none";
    difficultyButtons[0].style.display = "block";

}

// When one of the difficulty buttons are picked set the shuffle number to the number corresponding to the difficulty
function selectDifficulty(difficulty) {

    let shuffleNum = 0;

    switch (difficulty) {
        case 'easy':
            shuffleNum = 1;
            break;
        
        case 'medium':
            shuffleNum = 2;
            break;

        default:
            shuffleNum = 3
            break;
    }

    // Hide difficulty buttons once clicked
    difficultyButtons[0].style.display = "none";

    shuffleGame(shuffleNum);
}

// Start game by shuffling image
function shuffleGame(shuffleNum) {

    let imgArray = ["./images/p1.png", "./images/p2.png", "./images/p3.png", "./images/p4.png", "./images/p5.png", "./images/p6.png",
         "./images/p7.png", "./images/p8.png"];

    for (let i = 0; i < shuffleNum; i++) {
        shuffleArray(imgArray);
    }

    var images = document.querySelectorAll('#gameTable img');

    // Assign the randomly shuffled array to the image table
    images.forEach((img, index) => {
        img.src = imgArray[index];
        if (index == 8) {
            img.src = "";
        }
    })

    game[0].style.display = "block";
    saveButton[0].style.display = "block";

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
    localStorage.setItem("previousSave", "true")
}

let dragged = null;

// Drag and Drop API
function drop(ev) {
    ev.preventDefault();
    target = ev.target;

    swapBoxes(dragged, target);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    dragged = ev.target;
    
    var images = document.querySelectorAll('#gameTable img');
    images.forEach((img, index) => {
        console.log(img.src);
    })
}

//TODO Check if selected item is adjacent to empty tile


// If selected item is adjacent swap the two tiles.
function swapBoxes(selected, target) {
    console.log("Before Selected: ", selected.src);
    console.log("Before Target: ", target.firstElementChild.src);

    if(selected != target) {
        temp = target.firstElementChild.src;
        target.firstElementChild.src = selected.src;
        selected.src = "";
    }
    else {
        alert("Cannot move to same place!");
    }

    var images = document.querySelectorAll('#gameTable img');
    images.forEach((img, index) => {
        console.log("Box ", index + 1, ": ", img.src);
    })

    console.log("After Selected: ", selected.src);
    console.log("After Target: ", target.firstElementChild.src);
    
    
}

