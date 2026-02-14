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

// Create a play round function

function playGame() {
    // Move scores into playGame function
    let computerScore = 0;
    let humanScore = 0;

    // Re-define playRound inside playGame to access the local scores
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
        console.log(`Current Score - You: ${humanScore}, Computer: ${computerScore}\n`);
    }
}

// Play five rounds
console.log("🎮 Welcome to Rock Paper Scissors! 🎮");
console.log("Best of 5 rounds - Let's begin!\n");

for (let round = 1; round <= 5; round++) {
    console.log(`--- Round ${round} ---`);
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();
    playRound(computerChoice, humanChoice);
}

// Announce Winner
console.log("=== GAME OVER ===");
console.log(`🏆 Final Score - You: ${humanScore}, Computer: ${computerScore}`);

if (humanScore > computerScore) {
    console.log("🎉 Congratulations! You are the champion!")
} else if (computerScore > humanScore) {
    console.log("💻 The computer wins! Better luck next time!")
} else {
    console.log("🤝 It's a draw! Well played both!");
}

// Play the game
playGame();