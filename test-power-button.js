let playerPoints = 0;
let computerPoints = 0;
let rounds = 0;

/* As shown from Mozilla's documentation */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
/* end of function */

let computerPlay = () => {
    let rockPaperScissors,
        randomNumber;
    randomNumber = getRandomInt(3);

    switch (randomNumber) {
        case 0: return "rock";
                break;
        case 1: return "scissors";
                break;
        case 2: return "paper";
                break;
        default: return "error";
                break;
    }
};

function logRoundsAndPoints(playerPoints, computerPoints ) {
    console.log("Round " + (6 - rounds));
    console.log("Player points: " + playerPoints);
    console.log("Computer Points: " + computerPoints);

    /* Match POINT! */
    if ( playerPoints == 2 || computerPoints == 2) {
        /* matchPoint(); */
        console.log("Match Point!");
    }

    rounds++;

}

function removeEventListeners() {
    let rock = document.querySelector(".rock");
    let paper = document.querySelector(".paper");
    let scissors = document.querySelector(".scissors");

    rock.removeEventListener("mouseover", scaleImage, true);
    paper.removeEventListener("mouseover", scaleImage, true);
    scissors.removeEventListener("mouseover", scaleImage, true);

    rock.removeEventListener("mouseout", scaleImage, true);
    paper.removeEventListener("mouseout", scaleImage, true);
    scissors.removeEventListener("mouseout", scaleImage, true);

    rock.removeEventListener("click", playRound, true);
    paper.removeEventListener("click", playRound, true);
    scissors.removeEventListener("click", playRound, true);
}

function endMatch() {

}

function computerChoiceComesIntoFocusButIsHiddenFromViewAndWillFlip() {
    
}

function blinkPlayerWinningElement() {
    let parentBackground = document.querySelector(".parent-background");
    let imageHighlight = parentBackground.appendChild(document.createElement("img"));
        imageHighlight.id = "highlight-player-selected-image";
    let youWinTheRoundTextContainer = parentBackground.appendChild(document.createElement("div"));
        youWinTheRoundTextContainer.id = "you-win-the-round-text-container";
    let youWinTheRoundText = youWinTheRoundTextContainer.appendChild(document.createElement("p"));
        youWinTheRoundText.id = "you-win-the-round-text";
        youWinTheRoundText.textContent = "You won the round!";
    let addTrophy = parentBackground.appendChild(document.createElement("img"));
        addTrophy.src = "player-wins-a-trophy.png";
        addTrophy.id = "add-trophy";

}

function blinkComputerWinningElement() {
    let parentBackground = document.querySelector(".parent-background");
    let imageHighlight = parentBackground.appendChild(document.createElement("img"));
        imageHighlight.id = "highlight-computer-selected-image";
}

function blinkTieElement() {

}

function moveAnimationElements( playerSelectedClassName, computerSelectedClassName, winner) {
    let playerSelectedItem = document.querySelector("."+playerSelectedClassName);
        playerSelectedItem.id = "move-player-selection";
        playerSelectedItem.style.zIndex = "11";

    let computerSelectedItem = document.getElementById("none-yet");
        computerSelectedItem.id = "move-computer-selection";

        if (winner == "player") {
            playerSelectedItem.addEventListener("animationend", blinkPlayerWinningElement, false);
        }
        else if (winner == "computer") {
            computerSelectedItem.addEventListener("animationend", blinkComputerWinningElement, false);
        }
        else {
            playerSelectedItem.addEventListener("animationend", blinkTieElement, false);
        }

}

function createAnimationBackgroundAndAnimationElements(playerSelectedClass, computerSelectedClass) {
    
    removeEventListeners(); /* cleans up so zIndex will work and so the image will stay up there */
    let animationBackground = document.querySelector(".none");
        animationBackground.id = "add-animation-background";
    let computerSelectedItem = document.createElement("img");
        computerSelectedItem.id = "none-yet"
    let parentBackground = document.querySelector(".parent-background");
        parentBackground.appendChild(computerSelectedItem);
    let computerSelectedItemSrc = computerSelectedClass + "-with-border.png";
        computerSelectedItem.src = computerSelectedItemSrc;

}

function animateRoundWinner( playerSelectedClassName, computerSelectedClassName, winner ) {
    
    createAnimationBackgroundAndAnimationElements(playerSelectedClassName, computerSelectedClassName);
    moveAnimationElements(playerSelectedClassName, computerSelectedClassName, winner);
    

}

function playRound() {

    let playerSelection = this.className
    let computerSelection = computerPlay();
    
    if (playerSelection == "rock" && computerSelection == "scissors" || playerSelection == "scissors" && computerSelection == "paper" ||
        playerSelection == "paper" && computerSelection == "rock") {
            
            playerPoints++;
            animateRoundWinner(playerSelection, computerSelection, "player");
            logRoundsAndPoints(playerPoints, computerPoints )

    }

    else if ( playerSelection == computerSelection ) {
            animateRoundWinner(playerSelection, computerSelection, "nowinner");
    }

    else {
            computerPoints++;
            animateRoundWinner(playerSelection, computerSelection, "computer");
            logRoundsAndPoints(playerPoints, computerPoints )
    }

    if ( rounds >= 6 || playerPoints > 2 || computerPoints > 2 ) {
        endMatch();
    }

}

function addBorder( imageClassName, yesOrNo ) {
    let image = document.querySelector("."+imageClassName);
    let path = imageClassName;
    if (yesOrNo == "yes" ) {
        path += "-with-border";
    }
    path += ".png";

    image.src = path;
}

function scaleImage() {

    if (this.style.transform == "scale(1.3)" ) {
        this.style.transform = "";
        this.style.zIndex = "2";
        addBorder(this.className, "no");
        
    }
    else {
        this.style.transform = "scale(1.3)";
        this.style.zIndex = "5";
        addBorder(this.className, "yes");
        
    }
}

function scaleImagesWhenUserHovers() {

    let rock = document.querySelector(".rock");
    let paper = document.querySelector(".paper");
    let scissors = document.querySelector(".scissors");

    rock.addEventListener("mouseover", scaleImage, true);
    paper.addEventListener("mouseover", scaleImage, true);
    scissors.addEventListener("mouseover", scaleImage, true);

    rock.addEventListener("mouseout", scaleImage, true);
    paper.addEventListener("mouseout", scaleImage, true);
    scissors.addEventListener("mouseout", scaleImage, true);

    rock.addEventListener("click", playRound, true);
    paper.addEventListener("click", playRound, true);
    scissors.addEventListener("click", playRound, true);

}

function cleanUpStartingContent() {
    let comfortableBackgroundImage = document.querySelector(".comfortable-background-image");
    comfortableBackgroundImage.removeAttribute("usemap");
    comfortableBackgroundImage.src = "comfortable-background-image.png";
    let powerButtonMap = document.querySelector("map");
        powerButtonMap.removeChild(powerButtonMap.firstElementChild);
        powerButtonMap.remove();
}

function createRockPaperScissorsImages() {

    cleanUpStartingContent();

    let comfortableBackgroundImage = document.querySelector(".parent-background");
    let rock = document.createElement("img");
        comfortableBackgroundImage.appendChild(rock);
        rock.className = "rock";
    let paper = document.createElement("img");
        comfortableBackgroundImage.appendChild(paper);
        paper.className = "paper";
    let scissors = document.createElement("img");
        comfortableBackgroundImage.appendChild(scissors);
        scissors.className = "scissors";

    rock.src = "rock.png";
    paper.src = "paper.png";
    scissors.src = "scissors.png";

    scaleImagesWhenUserHovers();

}

function createMatch() {
    let powerButton = document.getElementById("power-button");
    powerButton.addEventListener("click", createRockPaperScissorsImages, true);
}

createMatch();