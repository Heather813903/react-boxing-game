import { useState, useEffect, useCallback, use } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./GamePage.css";

function GamePage() {
  const [playerHealth, setPlayerHealth] = useState(100);
  const [cpuHealth, setCpuHealth] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [difficulty, setDifficulty] = useState(null);
  const [playerHit, setPlayerHit] = useState(false);
  const [cpuHit, setCpuHit] = useState(false);
  const [roundCount, setRoundCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const level = params.get("difficulty");
    if (level && !difficulty) {
      setDifficulty(level);
    }
  }, [location.search, difficulty]);

  // Player attack
  const handlePunch = () => {
    if (gameOver) return;
    const playerDamage = Math.floor(Math.random() * 11) + 8; // 8–18
    setCpuHit(true);
    setTimeout(() => setCpuHit(false), 300);
    setCpuHealth((prev) => Math.max(prev - playerDamage, 0));
  };

  // CPU stats by difficulty
  const getCpuStats = useCallback(() => {
    switch (difficulty) {
      case "Easy":
        return { damage: 10, delay: 1500 };
      case "Medium":
        return { damage: 15, delay: 1000 };
      case "Hard":
        return { damage: 20, delay: 750 };
      default:
        return { damage: 0, delay: 0 };
    }
  }, [difficulty]);

  // CPU attacks automatically
  useEffect(() => {
    if (cpuHealth < 100 && cpuHealth > 0 && !gameOver && difficulty) {
      const { damage, delay } = getCpuStats();
      const timeout = setTimeout(() => {
        setPlayerHit(true);
        setTimeout(() => setPlayerHit(false), 300);
        setPlayerHealth((prev) => Math.max(prev - damage, 0));
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [cpuHealth, difficulty, gameOver, getCpuStats]);

  // Player loses
  useEffect(() => {
    if (playerHealth <= 0 && !gameOver) {
      setGameOver(true);
      setWinner("CPU");
      setCpuScore((prev) => prev + 1);
      setRoundCount((prev) => prev + 1);
    }
  }, [playerHealth, gameOver]);

  // CPU loses
  useEffect(() => {
    if (cpuHealth <= 0 && !gameOver) {
      setGameOver(true);
      setWinner("Player");
      setPlayerScore((prev) => prev + 1);
      setRoundCount((prev) => prev + 1);
    }
  }, [cpuHealth, gameOver]);

  // Declare champion after 8 rounds
  useEffect(() => {
    if (roundCount >= 8) {
      const finalWinner =
        playerScore > cpuScore
          ? "Player"
          : cpuScore > playerScore
          ? "CPU"
          : "Draw";
      setWinner(finalWinner);
      setGameOver(true);
    }
  }, [roundCount, playerScore, cpuScore]);

  // Reset game logic
  const handleRestart = () => {
    if (roundCount >= 8) {
      setPlayerScore(0);
      setCpuScore(0);
      setRoundCount(0);
    }
    setPlayerHealth(100);
    setCpuHealth(100);
    setGameOver(false);
    setWinner(null);
  };

  
  // Knockout / Champion overlay
  const renderKnockout = () => {
    if (!gameOver) return null;
    if (roundCount >= 8) {
      return (
        <div className="knockout-overlay">
          <h1>
            {winner === "Draw"
              ? "DRAW GAME!"
              : `${winner.toUpperCase()} IS CHAMPION!`}
          </h1>
        </div>
      );
    }
    return (
      <div className="knockout-overlay">
        <h1>KNOCKOUT!!</h1>
      </div>
    );
  };

  return (
    <div className="arena">
      <h1 className="arena-title">Let's get ready to REACT!</h1>

      <div className="scoreboard">
        <p>Player Score: {playerScore}</p>
        <p>CPU Score: {cpuScore}</p>
        {renderKnockout()}
      </div>

      <div className="ring">
        {/* Player side */}
        <div className={`boxer red-corner ${playerHit ? "hit" : ""}`}>
          <p>Player</p>
          <div className="health-bar">
            <div
              className={`health-fill ${playerHit ? "hit" : ""}`}
              style={{
                width: `${playerHealth}%`,
                backgroundColor:
                  playerHealth > 50
                    ? "green"
                    : playerHealth > 20
                    ? "orange"
                    : "red",
              }}
            />
          </div>
        </div>

        <div className="vs">VS</div>

        {/* CPU side */}
        <div className={`boxer blue-corner ${cpuHit ? "hit" : ""}`}>
          <p>CPU</p>
          <div className="health-bar">
            <div
              className={`health-fill ${cpuHit ? "hit" : ""}`}
              style={{
                width: `${cpuHealth}%`,
                backgroundColor:
                  cpuHealth > 50
                    ? "green"
                    : cpuHealth > 20
                    ? "orange"
                    : "red",
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
          <button className="home-button" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      )}
    </div>
  );
}

export default GamePage;
