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

// ---- 2. STATE ----------------------------------

let state = {
    humanScore:    0,
    computerScore: 0,
    roundNumber:   0,
    gameOver:      false,
};

function resetState() {
    state = {
        humanScore:    0,
        computerScore: 0,
        roundNumber:   0,
        gameOver:      false,
    };
}


/* ── 3. UI LAYER (DOM reads / writes only) ────────────────────── */
 
// Cache DOM references once

const ui = {
    humanScore: document.getElementById("human-score"),
    computerScore:    document.getElementById("computer-score"),
    playerEmoji:      document.getElementById("player-emoji"),
    computerEmoji:    document.getElementById("computer-emoji"),
    playerDisplay:    document.getElementById("player-choice-display"),
    computerDisplay:  document.getElementById("computer-choice-display"),
    clashIcon:        document.getElementById("clash-icon"),
    resultBanner:     document.getElementById("result-banner"),
    resultText:       document.getElementById("result-text"),
    roundLog:         document.getElementById("round-log"),
    gameOverlay:      document.getElementById("game-overlay"),
    overlayTrophy:    document.getElementById("overlay-trophy"),
    overlayTitle:     document.getElementById("overlay-title"),
    overlayScore:     document.getElementById("overlay-score"),
    resetBtn:         document.getElementById("reset-btn"),
    choiceButtons:    document.querySelectorAll(".choice-btn"),
};

function updateScoreboard() {
    // Human Score
    ui.humanScore.textContent = state.humanScore;
    triggerBump(ui.humanScore);

    // Computer score
    ui.computerScore.textContent = state.computerScore;
    triggerBump(ui.computerScore);
}

function triggerBump(el) {
    el.classList.remove("score-bump");

    // Fore reflow so animation restarts
    void el.offsetWidth;
    el.classList.add("score-bump");
}

function showChoices(humanChoice, computerChoice) {
    // Player side
    ui.playerEmoji.textContent = EMOJIS[humanChoice];
    animateReveal(ui.playerDisplay);

    // Computer side
    ui.computerEmoji.textContent = EMOJIS[computerChoice];
    animateReveal(ui.computerDisplay);

    // Clash Icon
    ui.clashIcon.classList.remove("active");
    void ui.clashIcon.offsetWidth;
    ui.clashIcon.classList.add("active");
}

function animateReveal(displayEl) {
    displayEl.classList.remove("reveal");
    void displayEl.offsetWidth;
    displayEl.classList.add("reveal");
}

function showResult(outcome, message) {
    ui.resultBanner.className = "result-banner" + outcome;
    ui.resultText.textContent = message;
}

function addLogEntry(round, outcome, humanChoice, computerChoice) {
    // Remove placeholder if present 
    const placeholder = ui.roundLog.querySelector(".log-placeholder");
    if (placeholder) placeholder.remove();

    const li = document.createElement("li");
    li.className = `log-entry ${outcome}`;

    const resultLabel = outcome === "win" ? "win" : outcome === "lose" ? "LOSE" : "TIE";

    li.innerHTML = `
    <span class="log-round">R${round}</span>
    <span class="log-desc">${EMOJIS[humanChoice]} vs ${EMOJIS[computerChoice]}</span>
    <span class="log-result">${resultLabel}</span>
    `;

    // Prepend so newest is at the top
    ui.roundLog.prepend(li);
}

function setButtonDisabled(disabled) {
    ui.choiceButtons.forEach((btn) => (btn.disabled = disabled));
}

function showGameOver(winner) {
    let trophy, title, titleClass;

    if (winner === "human") {
        trophy      = "🏆";
        title       = "YOU WIN!";
        titleClass  = "win";
    } else if (winner === "computer") {
        trophy      = "💻";
        title       = "CPU WINS!";
        titleClass  = "lose";
    } else {
        trophy      = "🤝";
        title       = "IT'S A DRAW";
        titleClass  = "tie";
    }

    ui.overlayTrophy.textContent    = trophy;
    ui.overlayTitle.textContent     = title;
    ui.overlayTitle.className       = `overlay-title ${titleClass}`;
    ui.overlayScore.textContent  = `${state.humanScore} – ${state.computerScore}`;
    ui.gameOverlay.hidden = false;

}

function resetUI() {
    ui.humanScore.textContent    = "0";
    ui.computerScore.textContent = "0";
    ui.playerEmoji.textContent   = "❓";
    ui.computerEmoji.textContent = "❓";

    ui.resultBanner.className = "result-banner";
    ui.resultText.textContent = "Choose your weapon!";

    ui.clashIcon.classList.remove("active");
    ui.playerDisplay.classList.remove("reveal");
    ui.computerDisplay.classList.remove("reveal");

    // Clear log
    ui.roundLog.innerHTML = '<li class="log-placeholder">No rounds played yet…</li>';

    ui.gameOverlay.hidden = true;
    setButtonsDisabled(false);
}