import "./GamePage.css";

function GamePage() {
    return (    
        <div className="arena">
            <h2 className="arena-title">Welcome to the Boxing Arena!</h2>
            <div className="ring">
                <div className="boxer red-corner">
                    <p>Player</p>
                </div>
                <div className="vs">VS</div>
                <div className="boxer blue-corner">
                    <p>CPU</p>
                </div>
            </div>
        </div>
    );
}

export default GamePage;
