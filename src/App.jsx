import React, { useState } from 'react';
import './App.css';


const parties = [
  { name: "BJP", symbolUrl: "https://m.media-amazon.com/images/I/61IRSd00KML.jpg", id: 1 },
  { name: "Congress", symbolUrl: "https://www.peacockride.com/cdn/shop/files/inc2_60a391c1-80da-43d0-92b2-5f438c63e657_1024x1024.jpg?v=1683788416", id: 2 },
  { name: "AAP", symbolUrl: "https://m.media-amazon.com/images/I/71Ng4IC65-L.jpg", id: 3 },
  { name: "TMC", symbolUrl: "https://m.media-amazon.com/images/I/41-rE1dBplL.jpg", id: 4 },
  { name: "CPIM", symbolUrl: "https://m.media-amazon.com/images/I/61VJoR4iywL.jpg", id: 5 },
  { name: "Shiv Sena", symbolUrl: "https://m.media-amazon.com/images/I/61-7w0truZL.jpg", id: 6 },
  { name: "BSP", symbolUrl: "https://www.peacockride.com/cdn/shop/files/Bsp_522a32c1-df4d-456d-8242-24b28e2af2fb_1024x1024.jpg?v=1683788610", id: 7 },
  { name: "SP", symbolUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Samajwadi_Party.png", id: 8 },
  { name: "NCP", symbolUrl: "https://m.media-amazon.com/images/I/61ZUzZvZeML.jpg", id: 9 },
  { name: "JD(U)", symbolUrl: "https://m.media-amazon.com/images/I/41lSn+i+5mL._AC_UY1100_.jpg", id: 10 },
];

function App() {
  const [votes, setVotes] = useState(Array(10).fill(0)); 
  const [votedParty, setVotedParty] = useState(null);
  const [isVoteCompleted, setIsVoteCompleted] = useState(false);

  const handleVote = (partyId) => {
    if (votedParty === null) {
      const updatedVotes = [...votes];
      updatedVotes[partyId - 1] += 1;
      setVotes(updatedVotes);
      setVotedParty(partyId); 
      setIsVoteCompleted(true); 
    }
  };

  const handleReset = () => {
    setVotes(Array(10).fill(0));
    setVotedParty(null);
    setIsVoteCompleted(false);
  };

  return (
    <div className="App">
      <h1 className="heading">VOTING MACHINE</h1>
      
      <div className="parties">
        {parties.map((party, index) => (
          <div key={party.id} className={`party ${index % 2 === 0 ? 'left' : 'right'}`}>
            <div className="party-info">
              <img src={party.symbolUrl} alt={party.name} className="party-symbol" />
              <p>{party.name}</p>
            </div>
            <div className="vote-action">
              <button
                onClick={() => handleVote(party.id)}
                className="vote-button"
                disabled={votedParty !== null} 
              >
                Vote
              </button>
            </div>
            {/* Displaying vote count next to the party */}
            <div className="vote-count">
              {votes[party.id - 1]} votes
            </div>
          </div>
        ))}
      </div>

      {votedParty && (
        <div className="result">
          <h2 className="result-header">Vote Recorded!</h2>
          <p className="result-text">You voted for: {parties[votedParty - 1].name}</p>
          <img src={parties[votedParty - 1].symbolUrl} alt={parties[votedParty - 1].name} className="party-symbol" />
          <p className="vote-text">Votes: {votes[votedParty - 1]}</p>
          <button onClick={handleReset} className="reset-button">
            Reset Vote
          </button>
        </div>
      )}

      {isVoteCompleted && (
        <div className="final-result">
          <h2 className="final-result-header">Voting Results</h2>
          <div className="party-results">
            {parties.map((party, index) => (
              <div key={party.id} className="party-result">
                <img src={party.symbolUrl} alt={party.name} className="party-symbol" />
                <p className="party-name">{party.name}</p>
                <p className="vote-count-final">{votes[party.id - 1]} votes</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
