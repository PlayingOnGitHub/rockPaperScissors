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

function createComputerReadableFormatForExpectedInput( userInput ) {
    if (typeof userInput == "string" && userInput.trim() != "" ) {
        userInput = userInput.toLowerCase();
        userInput = userInput.trim();
        return userInput;
    }
    else {
        return false;
    }
}

function getPlayerSelection() {
    let playerSelection = false;
    while (playerSelection == false ) {
        playerSelection = "" /* User clicks rock paper or scissors. Update here! */
        playerSelection = createComputerReadableFormatForExpectedInput( playerSelection );
        if (playerSelection == "rock" || playerSelection == "scissors" || playerSelection == "paper" ) {
            return playerSelection;
        }
        else {
            playerSelection = false;
        }
    }
}

function playRound( playerSelection, computerSelection ) {
    let playerWins;
    
    if (playerSelection == "rock" && computerSelection == "scissors" || playerSelection == "scissors" && computerSelection == "paper" ||
        playerSelection == "paper" && computerSelection == "rock") {
            
            playerWins = true;

    }

    else if ( playerSelection == computerSelection ) {
            playerWins = "tie";
    }

    else {
            playerWins = false;
    }

    return playerWins;

}

function logRoundsAndPoints( rounds, playerPoints, computerPoints ) {
    console.log("Round " + (6 - rounds));
    console.log("Player points: " + playerPoints);
    console.log("Computer Points: " + computerPoints);
}

function makeMatchPointComment( rounds, playerPoints, computerPoints ) {
    if ( playerPoints == 2 || computerPoints == 2) {
        matchPoint(); /* please update to include this function */
        console.log("Match Point!");
    }
}

function game() {
    let playerPoints = 0;
    let computerPoints = 0;

    let rounds = 5;
    let tie;

    while ( rounds > 0 && playerPoints < 3 && computerPoints < 3 ) {

        makeMatchPointComment( rounds, playerPoints, computerPoints );

        switch( playRound( getPlayerSelection(), computerPlay() ) ) {
            case true: {
                ++playerPoints;
                wonRound(); /* please update to include this function */
                logRoundsAndPoints( rounds, playerPoints, computerPoints );

                --rounds;
                break;
            }

            case "tie": {
                alert("Tie?!?!");
                break;
            }

            case false: {
                ++computerPoints;
                lostRound(); /* please update to include this function */
                logRoundsAndPoints( rounds, playerPoints, computerPoints );

                --rounds;
                break;
            }
        }

    }

    (playerPoints > computerPoints) ? youWin() : youLose(); /* please update win lose functions to correspond to new images! */
    (playerPoints > computerPoints) ? console.log("You win!") : console.log("You lose!");

}

/* game() ???? */