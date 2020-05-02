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

function createAnimationBackgroundAndAnimationElements(playerSelectedClass, computerSelectedClass) {
    
    removeEventListeners(); /* cleans up so zIndex will work and so the image will stay up there */
    let animationBackground = document.querySelector(".none");
        animationBackground.id = "add-animation-background";
    let computerSelectedItem = document.createElement("img");
    let parentBackground = document.querySelector(".parent-background");
        parentBackground.appendChild(computerSelectedItem);
        computerSelectedItem.id = "move-computer-selection";
    let computerSelectedItemSrc = computerSelectedClass + "-with-border.png";
        computerSelectedItem.src = computerSelectedItemSrc;
    /*let backgroundImage = document.querySelector(".comfortable-background-image");
        backgroundImage.id = "fade-element";
    if (playerSelectedClass != "rock") {
        let rock = document.querySelector(".rock");
            rock.id = "fade-element";
    }

    if (playerSelectedClass != "paper") {
        let paper = document.querySelector(".paper");
            paper.id = "fade-element";
    }

    if (playerSelectedClass != "scissors") {
        let scissors = document.querySelector(".scissors");
            scissors.id = "fade-element";
    }*/

    let playerSelection = document.querySelector("."+playerSelectedClass);
        playerSelection.style.zIndex = "11";
}

function animateRoundWinner( playerSelectedClassName, computerSelectedClassName, winner ) {
    
    createAnimationBackgroundAndAnimationElements(playerSelectedClassName, computerSelectedClassName);

    let playerSelectedItem = document.querySelector("."+playerSelectedClassName);
        playerSelectedItem.id = "move-rock";
        
    /*let playerSelection = document.querySelector("."+playerSelectionClassName);
    let computerSelection = document.querySelector("."+computerSelectionClassName);
    computerSelection.id = "move-computer-selection";
    playerSelection.id = "move-player-selection";

    playerSelection.addEventListener("animationend", computerChoiceComesIntoFocusButIsHiddenFromViewAndWillFlip, false);*/
    

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