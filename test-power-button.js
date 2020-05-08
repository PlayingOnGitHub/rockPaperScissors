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

function endGame() {

    let parentBackgroundImage = document.querySelector(".comfortable-background-image");
    if ( playerPoints > computerPoints ) {
        parentBackgroundImage.src = "you-win.png";
    }
    else {
        parentBackgroundImage.src = "you-lose.png";
    }

    let rock = document.querySelector(".rock");
        rock.remove();
    let paper = document.querySelector(".paper");
        paper.remove();
    let scissors = document.querySelector(".scissors");
        scissors.remove();



}

function recreatePlayerSelectedElement() {
    let playerSelectedItem = document.querySelector("."+this.className);
        playerSelectedItem.removeEventListener("animationend", recreatePlayerSelectedElement, true);
        playerSelectedItem.removeAttribute("id");
        playerSelectedItem.removeAttribute("style");
        playerSelectedItem.src = this.className + ".png";
}

function cleanUpAnimationBackgroundAndCreateListenersAgain() {
    let animationBackground = document.getElementById("fade-out-animation-background");
        animationBackground.removeEventListener("animationend", cleanUpAnimationBackgroundAndCreateListenersAgain, true);
        animationBackground.removeAttribute("id");

        if ( rounds >= 6 || playerPoints > 2 || computerPoints > 2 ) {
            endGame();
        }
        else {
            scaleImagesWhenUserHovers();
        }
}

function startANewRound() {
    /* highlightWinner is how I know who the winner is */

    let highlightedWinner = document.getElementsByClassName("highlight-image")[0];
    let trophy = document.querySelector(".trophy");

    if (highlightedWinner.id == "highlight-player-selected-image") {
            trophy.id = "fade-out-trophy";
            trophy.addEventListener( "animationend", () => trophy.remove(), true );
    }
    else {
        trophy.remove();
    }

    highlightedWinner.remove();

    let matchNotificationText = document.getElementById("fade-in-match-notification-text");
        matchNotificationText.id = "fade-out-match-notification";
        matchNotificationText.addEventListener("animationend", () => {matchNotificationText.parentElement.remove()}, true);

    let playerSelectedItem = document.getElementById("move-player-selection");
        playerSelectedItem.id = "put-away-" + playerSelectedItem.className;
        playerSelectedItem.addEventListener("animationend", recreatePlayerSelectedElement, true);

    let computerSelectedItem = document.getElementById("move-computer-selection");
        computerSelectedItem.id = "fade-out-computer-selection";
        computerSelectedItem.addEventListener("animationend", () => computerSelectedItem.remove(), true);

    let animationBackground = document.getElementById("add-animation-background");
        animationBackground.id = "fade-out-animation-background";
        animationBackground.addEventListener("animationend", cleanUpAnimationBackgroundAndCreateListenersAgain, true);

        let createADelay = document.getElementById("create-delay");
            createADelay.remove();
}

function highlightWinner(playerOrComputer) {
    let imageHighlight = document.querySelector(".highlight-image");
        imageHighlight.id = "highlight-"+playerOrComputer+"-selected-image";
}

function addTrophy() {
    let addATrophy = document.querySelector(".trophy");
        addATrophy.src = "player-wins-a-trophy.png";
        addATrophy.id = "add-trophy";
}

function addMatchNotification( wonLostOrTied ) {
    let matchNotificationText = document.querySelector(".match-notification-text");
        matchNotificationText.textContent = "You " + wonLostOrTied + " the round!";
        matchNotificationText.id = "fade-in-match-notification-text";

}

function createDelay( numericTimeValue ) {
    let parentBackground = document.querySelector(".parent-background");
    let createADelay = parentBackground.appendChild( document.createElement("div") );

        createADelay.style.animationDuration = "" + numericTimeValue + "s";
        createADelay.id = "create-delay";
        createADelay.addEventListener("animationend", startANewRound, true)
}

function playerWins() {
    let computerSelectedItem = document.getElementById("move-computer-selection");
        computerSelectedItem.removeEventListener("animationend", playerWins, true);
    highlightWinner("player");
    addTrophy();
    addMatchNotification("won");
    createDelay(3.5);
}
function computerWins() {
    let computerSelectedItem = document.getElementById("move-computer-selection");
        computerSelectedItem.removeEventListener("animationend", computerWins, true);
    highlightWinner("computer");
    addMatchNotification("lost");
    createDelay(3.0);
}
function itsATie() {
    let computerSelectedItem = document.getElementById("move-computer-selection");
        computerSelectedItem.removeEventListener("animationend", itsATie, true);
    addMatchNotification("tied");
    createDelay(3.0);
}


function runAnimations( playerSelectedClassName, computerSelectedClassName, winner) {
    let playerSelectedItem = document.querySelector("."+playerSelectedClassName);
        playerSelectedItem.id = "move-player-selection";
        playerSelectedItem.style.zIndex = "11";

    let computerSelectedItem = document.getElementById("computers-choice");
        computerSelectedItem.id = "move-computer-selection";

    if (winner == "player") {
        computerSelectedItem.addEventListener( "animationend", playerWins, true);
    }
    else if (winner == "computer") {
        computerSelectedItem.addEventListener( "animationend", computerWins, true);
    }
    else {
        computerSelectedItem.addEventListener( "animationend", itsATie, true);
    }

}

function createHighlightWinnerElement() {
    let parentBackground = document.querySelector(".parent-background");
    let imageHighlight = parentBackground.appendChild(document.createElement("img"));
        imageHighlight.className = "highlight-image";
}

function createTrophyElement() {
    let parentBackground = document.querySelector(".parent-background");
    let addATrophy = parentBackground.appendChild(document.createElement("img"));
        addATrophy.className = "trophy";
}

function createMatchNotificationElement() {
    let parentBackground = document.querySelector(".parent-background");
    let matchNotificationContainer = parentBackground.appendChild(document.createElement("div"));
        matchNotificationContainer.className = "match-notification-container";
    let matchNotificationText = matchNotificationContainer.appendChild(document.createElement("p"));
        matchNotificationText.className = "match-notification-text"
}

function createComputerElement( computerSelectedClassName ) {
    let parentBackground = document.querySelector(".parent-background");
    let computerSelectedItemSrc = computerSelectedClassName + "-with-border.png";
    let computerSelectedItem = document.createElement("img");
        computerSelectedItem.className = "computer-selection";
        computerSelectedItem.id = "computers-choice";
        computerSelectedItem.src = computerSelectedItemSrc;
    
        parentBackground.appendChild( computerSelectedItem );
}

function createAnimationElements( computerSelectedClassName ) {
    createComputerElement( computerSelectedClassName );
    createMatchNotificationElement();
    createTrophyElement();
    createHighlightWinnerElement();
}

function createAnimationBackground() {
    let animationBackground = document.querySelector(".none");
        animationBackground.id = "add-animation-background";
}

function animateRoundWinner( playerSelectedClassName, computerSelectedClassName, winner ) {
    
    removeEventListeners();
    createAnimationBackground();
    createAnimationElements(computerSelectedClassName);
    runAnimations( playerSelectedClassName, computerSelectedClassName, winner );

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
            animateRoundWinner(playerSelection, computerSelection, "tied");
    }

    else {
            computerPoints++;
            animateRoundWinner(playerSelection, computerSelection, "computer");
            logRoundsAndPoints(playerPoints, computerPoints )
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
    comfortableBackgroundImage.src = "comfortable-background-image.png";
    let powerButton = document.getElementById("power-button");
        powerButton.remove();
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