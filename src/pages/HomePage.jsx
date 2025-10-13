import { useNavigate } from "react-router-dom";


function HomePage() {
    const navigate = useNavigate();

    const handleStart = () => {
        navigate("/game");
};


    return (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <h2>Welcome to React Boxing!</h2>
            <p>Click the button below to throw some punches!</p>
            <button     
                onClick={handleStart}
                style={{ 
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    padding: '.0075rem 1.5rem',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    marginTop: '1rem',
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = '#218838')}
                onMouseOut={(e) => (e.target.style.backgroundColor = '#28a745')}
            >
                Start Boxing!
            </button>

        </div>
    );
}

export default HomePage;