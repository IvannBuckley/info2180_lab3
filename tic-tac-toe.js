// 
document.addEventListener("DOMContentLoaded", function() {
    const squares = document.querySelectorAll("#board div");
    let currentPlayer = "X";
    const gameState = new Array(9).fill(null);
  
    function initializeBoard() {
      squares.forEach((square, index) => {
        square.classList.add("square");
  
        // Add X or O on click
        square.addEventListener("click", function() {
          if (!gameState[index]) {
            gameState[index] = currentPlayer;
            square.textContent = currentPlayer;
            square.classList.add(currentPlayer);
  
            if (checkWinner()) {
              updateStatus(`Congratulations! ${currentPlayer} is the Winner!`);
            } else {
              currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
          }
        });
  
        //
        square.addEventListener("mouseover", function() {
          if (!gameState[index]) square.classList.add("hover");
        });
        square.addEventListener("mouseout", function() {
          square.classList.remove("hover");
        });
      });
    }
  
    // Update the game status
    function updateStatus(message) {
      const status = document.getElementById("status");
      status.textContent = message;
      status.classList.add("you-won");
    }
  
    // Check for a winning combination
    function checkWinner() {
      const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
      return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
      });
    }
  
    //Restart game on button click
    document.querySelector(".btn").addEventListener("click", function() {
      gameState.fill(null);
      squares.forEach(square => {
        square.textContent = "";
        square.classList.remove("X", "O", "hover");
      });
      updateStatus("Move your mouse over a square and click to play an X or an O.");
      document.getElementById("status").classList.remove("you-won");
      currentPlayer = "X";
    });
  
    initializeBoard();
  });
  