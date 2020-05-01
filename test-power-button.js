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

function endMatch() {

}

function computerChoiceComesIntoFocusButIsHiddenFromViewAndWillFlip() {

    /* do this after first animation */
    /* assign an I.D. to the right side element inside the parent div */


    
}

function createAnimationBackgroundAndAnimationElements(playerSelectionId, computerSelectionId) {
    let main = document.querySelector("main");
    parentBackground = main.appendChild(document.createElement("div"));
    parentBackground.className = "animation-background";

    let playerSelectionDiv = parentBackground.appendChild(document.createElement("div"));
    playerSelectionDiv.className = "player-selection-div-properties";
    let playerSelection = playerSelectionDiv.appendChild(document.createElement("img"));
    let playerSelectionSrc = playerSelectionId + "-with-border.png";
    playerSelection.src = playerSelectionSrc;
    playerSelection.className = "player-selection-image-properties";
    playerSelection.id = playerSelectionId;

    let computerSelectionDiv = parentBackground.appendChild(document.createElement("div"));
    computerSelectionDiv.className = "computer-selection-div-properties";
    let computerSelection = computerSelectionDiv.appendChild(document.createElement("img"));
    computerSelectionSrc = computerSelectionId + "-with-border.png";
    computerSelection.src = computerSelectionSrc;
    computerSelection.className = "computer-selection-image-properties";
    computerSelection.id = computerSelectionId;
}

function cleanUpElements(playerSelectionId) {
    let rock = document.getElementsByClassName("size-image")[0];
    let paper = document.getElementsByClassName("size-image")[1];
    let scissors = document.getElementsByClassName("size-image")[2];

    rock.removeEventListener("mouseover", scaleImage, true);
    paper.removeEventListener("mouseover", scaleImage, true);
    scissors.removeEventListener("mouseover", scaleImage, true);

    rock.removeEventListener("mouseout", scaleImage, true);
    paper.removeEventListener("mouseout", scaleImage, true);
    scissors.removeEventListener("mouseout", scaleImage, true);

    rock.removeEventListener("click", playRound, true);
    paper.removeEventListener("click", playRound, true);
    scissors.removeEventListener("click", playRound, true);

    let parentBackground = document.querySelector(".parent-background");
    parentBackground.remove();

}

function animateRoundWinner( playerSelectionId, computerSelectionId, winner ) {

    cleanUpElements(playerSelectionId);
    createAnimationBackgroundAndAnimationElements(playerSelectionId, computerSelectionId);

    let playerSelection = document.getElementById(playerSelectionId);
    let computerSelection = document.getElementById(computerSelectionId);
    computerSelection.id = "move-computer-selection"; /* performs animation by assigning i.d. to computer selected element */
    playerSelection.id = "move-player-selection"; /* performs animation by assigning i.d. to player selected element */

    playerSelection.addEventListener("animationend", computerChoiceComesIntoFocusButIsHiddenFromViewAndWillFlip, false); /*do this at the end of first animation */
    

}

function playRound() {

    let playerSelection = this.id;
    let computerSelection = computerPlay();
    
    if (playerSelection == "rock" && computerSelection == "scissors" || playerSelection == "scissors" && computerSelection == "paper" ||
        playerSelection == "paper" && computerSelection == "rock") {
            
            playerPoints++;
            animateRoundWinner(playerSelection, computerSelection, "player");
            logRoundsAndPoints(playerPoints, computerPoints )

    }

    else if ( playerSelection == computerSelection ) {
            /* TIE! */
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



/************************* NEW CONTENT BELOW ******************************************/

function addBorder( imageId, yesOrNo ) {
    let image = document.getElementById(imageId);
    let path = imageId;
    if (yesOrNo == "yes" ) {
        path += "-with-border";
    }
    path += ".png";

    image.src = path;
}

function scaleImage() {

    if (this.style.transform == "scale(1.3)" ) {
        this.style.transform = "";
        this.parentElement.style.zIndex = "2";
        addBorder(this.id, "no");
        
    }
    else {
        this.style.transform = "scale(1.3)";
        this.parentElement.style.zIndex = "5";
        this.style
        addBorder(this.id, "yes");
        
    }
}

function scaleImagesWhenUserHovers() {

    let rock = document.getElementsByClassName("size-image")[0];
    let paper = document.getElementsByClassName("size-image")[1];
    let scissors = document.getElementsByClassName("size-image")[2];

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

function cleanUpOldContent() {
    let backgroundImage = document.getElementsByClassName("image-div-placement")[0];
        backgroundImage.removeAttribute("usemap");
    let powerButtonMap = document.querySelector("map");
        powerButtonMap.removeChild(powerButtonMap.firstElementChild);
        powerButtonMap.remove();
}

function createRockPaperScissorsImages() {
    let backgroundImage = document.querySelector("img");
        backgroundImage.src = "comfortable-background-image.png";
    let rockContainer = document.getElementsByClassName("rock")[0];
    let rock = rockContainer.appendChild(document.createElement("img"));
        rock.src = "rock.png";
        rock.className = "size-image";
        rock.id = "rock";
    let paperContainer = document.getElementsByClassName("paper")[0];
    let paper = paperContainer.appendChild(document.createElement("img"));
        paper.src = "paper.png";
        paper.className = "size-image";
        paper.id = "paper";
    let scissorsContainer = document.getElementsByClassName("scissors")[0];
    let scissors = scissorsContainer.appendChild(document.createElement("img"));
        scissors.src = "scissors.png";
        scissors.className = "size-image";
        scissors.id = "scissors";

    cleanUpOldContent();
    scaleImagesWhenUserHovers();

}

function createMatch() {
    let powerButton = document.getElementById("power-button");
    powerButton.addEventListener("click", createRockPaperScissorsImages, true);
    
}

createMatch();