function playRound() {
    
}

function scaleImage() {

    if (this.style.transform == "scale(1.1)" ) {
        this.style.transform = "";
        this.parentElement.style.zIndex = "2";
        
    }
    else {
        this.style.transform = "scale(1.1)";
        this.parentElement.style.zIndex = "5";
        this.style
    }
}

function scaleImagesWhenUserHovers() {

    let rock = document.getElementsByClassName("size-image")[0];
    let paper = document.getElementsByClassName("size-image")[1];
    let scissors = document.getElementsByClassName("size-image")[2];
    /* add event listener "on hover" */
    rock.addEventListener("mouseover", scaleImage, true);
    paper.addEventListener("mouseover", scaleImage, true);
    scissors.addEventListener("mouseover", scaleImage, true);

    /* AND add an event listener to the scaled image "onmouseout" to rescale the image back if moving mouse away */
    rock.addEventListener("mouseout", scaleImage, true);
    paper.addEventListener("mouseout", scaleImage, true);
    scissors.addEventListener("mouseout", scaleImage, true);

    rock.addEventListener("click", playRound, true);
    paper.addEventListener("click", playRound, true);
    scissors.addEventListener("click", playRound, true);

}

function cleanUpOldContent() {
    let backgroundImage = document.getElementsByClassName("relative-1")[0];
        backgroundImage.removeAttribute("usemap");
    let powerButtonMap = document.querySelector("map");
        powerButtonMap.removeChild(powerButtonMap.firstElementChild);
        powerButtonMap.remove();
}

function createRockPaperScissorsImages() {
    let backgroundImage = document.querySelector("img");
        backgroundImage.src = "comfortable-background-image.png";
    let relativeTwo = document.getElementsByClassName("relative-2")[0];
    let rock = relativeTwo.appendChild(document.createElement("img"));
        rock.src = "rock.png";
        rock.className = "size-image";
    let relativeThree = document.getElementsByClassName("relative-3")[0];
    let paper = relativeThree.appendChild(document.createElement("img"));
        paper.src = "paper.png";
        paper.className = "size-image";
    let relativeFour = document.getElementsByClassName("relative-4")[0];
    let scissors = relativeFour.appendChild(document.createElement("img"));
        scissors.src = "scissors.png";
        scissors.className = "size-image";

    cleanUpOldContent();
    scaleImagesWhenUserHovers();

}

function startMatch() {
    let powerButton = document.getElementById("power-button");
    powerButton.addEventListener("click", createRockPaperScissorsImages, true);
}

startMatch();