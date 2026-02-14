function getComputerChoice() {
    // Generate a random number between 0 & 2
    const randomNumber = Math.random();

    // Convert to a choice between 1 & 2 and map the choice to Rock, Paper or Scissors
    if (randomNumber < 0.33) {
        return "Rock";
    } else if (randomNumber < 0.66) {
        return "Paper";
    } else {
        return "Scissors";
    }
}

function getHumanChoice() {
    // Use prompt to get human choice
    const choice = prompt("Enter your choice (Rock, Paper or Scissors): ");
    return choice;
}

// Initialize global score variables
let computerScore = 0;
let humanScore = 0;

// Create a play round function
function playRound (computerChoice, humanChoice) {
    // Convert human choice to lower case for case insensitive comparison
    const humanChoiceLower = humanChoice.toLowerCase();

    // Determine the winner
    if (computerChoice === humanChoice) {
        console.log(`It's a tie! Both chose ${humanChoiceLower}`);
    } else if (
        (humanChoiceLower === "Rock" && computerChoice === "Scissors") ||
        (humanChoiceLower === "Paper" && computerChoice === "Rock") ||
        (humanChoiceLower === "Scissors" && computerChoice === "Paper")
    ) {
        // Human wins
        console.log(`Human Wins! ${humanChoiceLower} beats ${computerChoice}`);
        humanScore++;
    } else {
        // Computer wins
        console.log(`You Lose! ${computerChoice} beats ${humanChoiceLower}`);
    }
}
