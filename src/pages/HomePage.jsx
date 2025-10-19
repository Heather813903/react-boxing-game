import { useNavigate } from "react-router-dom";


function HomePage() {
    const navigate = useNavigate();

    const handleSelectDifficulty = (level) => {
        navigate(`/game?difficulty=${level}`);
};


    return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <h2>Welcome to React Boxing!</h2>
            <p>Select a difficulty to start your match</p>
            <button     
                onClick={() => handleSelectDifficulty("Easy")}
                style={{ 
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '.075rem 1.5rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    marginTop: '1rem',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
            >
                Easy

            </button>

            <button     
                onClick={() => handleSelectDifficulty("Medium")}
                style={{    
                    backgroundColor: '#ffc107',
                    color: 'black',
                    border: 'none', 
                    padding: '.075rem 1.5rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    margin: "0.5rem",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#e0a800')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#ffc107')}
            >
                Medium
            </button>   

            <button     
                onClick={() => handleSelectDifficulty("Hard")}
                style={{    
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '.075rem 1.5rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    margin: "0.5rem",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#c82333')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#dc3545')}
            >
                Hard    
            </button>
        </div>
    
    );
}

export default HomePage;