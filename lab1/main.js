// Change color when "Here" is clicked
function changeColor() {
    var textInput = document.getElementById('textInput').value;
    if(textInput == "") {
        alert("Input text");
    }
    else {
        document.getElementById('hereText').innerHTML = textInput;

        var originalColor = document.getElementById('hereText').className;

        var bgClass = "p-4 rounded bg-";
        var randomColor = "";
        const bgColors = ["primary", "secondary", "success", "info", "warning", "danger", "dark", "light"];
        
        // Makes sure the new color is not the same as the current one
        do {
            randomColor = bgClass.concat(bgColors[(Math.floor(Math.random() * bgColors.length))]);
        } while ((randomColor.localeCompare(originalColor)) == 0);

        document.getElementById('hereText').className = randomColor;
    }
}

// Change font weight
function changeWeight() {
    if (document.querySelector('.container-fluid').style.fontWeight == "normal") {
        document.querySelector('.container-fluid').style.fontWeight = "bold";
    }
    else {
        document.querySelector('.container-fluid').style.fontWeight = "normal";
    }
}


// Get all elements with text in it and assign to array
let originalElements = document.getElementsByClassName('p-4');

let editableArray = []
let originalArray = []
Array.from(originalElements).forEach((element) => {
    originalArray.push(element.innerHTML);
    editableArray.push(element.innerHTML);
})

function updateText(list) {
    for(let i = 0; list.length; i++) {
        originalElements[i].innerHTML = list[i];
    }
}


// Key Pressed
document.addEventListener('keydown', (event) => {
    const keyPressed = event.key;

    if (keyPressed == 'ArrowRight') {

        // Makes sure elements are sorted regardless of uppercase or lowercase
        const alphabetical = editableArray.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

        updateText(alphabetical);
    }
    else if (keyPressed == 'ArrowLeft') {
        const sortReverse = editableArray.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).reverse();

        updateText(sortReverse);
    }
    else if (keyPressed == 'ArrowDown') {
        const randomOrder = editableArray.sort(() => Math.random() - 0.5 )
        updateText(randomOrder)
    }
    else if (keyPressed == 'ArrowUp') {
        updateText(originalArray);
    }
    else {
        console.log('No relevent key pressed');
    }

});

