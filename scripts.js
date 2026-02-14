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