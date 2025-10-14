import { useState, useEffect } from "react";
import "./GamePage.css";

function GamePage() {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [cpuHealth, setCpuHealth] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [score] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);

  const handlePunch = () => {
    if (gameOver) return;

    const playerDamage = Math.floor(Math.random() * 11) + 8; // 8-18
    setCpuHealth((prev) => Math.max(prev - playerDamage, 0));
  };

  useEffect(() => {
    if (cpuHealth <= 0 && !gameOver) {
      setGameOver(true);
      setWinner("Player");
      setPlayerScore((prev) => prev + 1); // award point to player
    }
  }, [cpuHealth, gameOver]);

  useEffect(() => {
    if (playerHealth <= 0 && !gameOver) {
      setGameOver(true);
      setWinner("CPU");
      setCpuScore((prev) => prev + 1); // award point to CPU
    }
  }, [playerHealth, gameOver]);

  useEffect(() => {
    if (!gameOver) {
      const cpuAttack = setInterval(() => {
        const cpuDamage = Math.floor(Math.random() * 11) + 8; // 8-18
        setPlayerHealth((prev) => Math.max(prev - cpuDamage, 0));
      }, 2500);

        return () => clearInterval(cpuAttack);
    }
    }, [gameOver]);

  const handleRestart = () => {
    setPlayerHealth(100);
    setCpuHealth(100);
    setGameOver(false);
    setWinner(null);
  };

  return (
    <div className="arena">
      <h2 className="arena-title">Welcome to the Boxing Arena!</h2>
      <div className="scoreboard">
        <p>Player Score: {playerScore}</p>
        <p>CPU Score: {cpuScore}</p>
      </div>
      <p className="scoreboard">Score: {score}</p>
      <div className="ring">
        <div className="boxer red-corner">
          <p>Player</p>
          <div className="health-bar">
            <div
              className="health-fill"
              style={{
                width: `${playerHealth}%`,
                backgroundColor:
                  playerHealth > 50 ? "green" : playerHealth > 20 ? "orange" : "red",
              }}
            />
          </div>
        </div>

        <div className="vs">VS</div>

        <div className="boxer blue-corner">
          <p>CPU</p>
          <div className="health-bar">
            <div
              className="health-fill"
              style={{
                width: `${cpuHealth}%`,
                backgroundColor:
                  cpuHealth > 50 ? "green" : cpuHealth > 20 ? "orange" : "red",
              }}
            />
          </div>
        </div>
      </div>

      {!gameOver ? (
        <button className="punch-button" onClick={handlePunch}>
          Throw Punch!
        </button>
      ) : (
        <div className="game-over">
          <h3>Winner: {winner}</h3>
          <button className="restart-button" onClick={handleRestart}>
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
}

export default GamePage;
