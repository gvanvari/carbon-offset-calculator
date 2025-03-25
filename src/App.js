import React, { useState } from 'react';
import './App.css'; // optional

function App() {
  const [mpg, setMpg] = useState('');
  const [miles, setMiles] = useState('');
  const [trees, setTrees] = useState(null);

  const handleCalculate = () => {
    if (!mpg || !miles || mpg <= 0 || miles <= 0) {
      alert("Please enter valid MPG and miles.");
      return;
    }

    const gallonsUsed = miles / mpg;
    const poundsCO2 = gallonsUsed * 19.6;
    const kgCO2 = poundsCO2 * 0.453592;
    const treesNeeded = Math.ceil(kgCO2 / 21.77);
    setTrees(treesNeeded);
  };

  const handleReset = () => {
    setMpg('');
    setMiles('');
    setTrees(null);
  };

  return (
    <div className="container">
      <h1>Carbon Offset Calculator</h1>

      <div>
        <label>Miles per Gallon (MPG):</label>
        <input
          type="number"
          value={mpg}
          onChange={(e) => setMpg(e.target.value)}
        />
      </div>

      <div>
        <label>Annual Miles Driven:</label>
        <input
          type="number"
          value={miles}
          onChange={(e) => setMiles(e.target.value)}
        />
      </div>

      <div>
        <button onClick={handleCalculate}>Calculate</button>
        <button onClick={handleReset} style={{ marginLeft: '1rem', backgroundColor: '#888', color: '#fff' }}>
          Reset
        </button>
      </div>

      {trees !== null && (
        <p className="result">
          🌳 You need to plant <strong>{trees}</strong> trees to offset this year's car emissions.
        </p>
      )}
    </div>
  );
}

export default App;
