// Game Logic

const WIN_SCORE = 5;

const BEATS = {
    Rock: "Scissors",
    Paper: "Rock",
    Scissors: "Paper",
}

const EMOJIS = {
    Rock:     "🪨",
    Paper:    "📄",
    Scissors: "✂️",
};

function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissors"];
    return choices[Math.floor(Math.random() * choices.length)];
}

/*Evaluate a single round.
 @returns {{ outcome: "win"|"lose"|"tie", message: string }}
 */

function evaluateRound(humanChoice, computerChoice) {
    if (humanChoice === getComputerChoice) {
        return {
            outcome: "tie",
            message: `It's a tie! Both chose ${humanChoice}`,
        };
    }

    if (BEATS[humanChoice] === computerChoice) {
        return {
            outcome: "win",
            message: `You win! ${humanChoice} beats ${computerChoice}.`,
        };
    }
    return {
        outcome: "lose",
        message: `CPU wins! ${computerChoice} beats ${humanChoice}.`,
    };
}