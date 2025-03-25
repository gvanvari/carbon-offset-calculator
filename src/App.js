import React, { useState } from 'react';
import './App.css'; 

const App = () => {
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [fuelEfficiencyUnit, setFuelEfficiencyUnit] = useState('kmpl'); // Default unit
  const [annualUsage, setAnnualUsage] = useState('');
  const [annualUsageUnit, setAnnualUsageUnit] = useState('km'); // Default unit
  const [emissions, setEmissions] = useState(null);
  const [trees, setTrees] = useState(null);

  const CO2_ABSORPTION_PER_TREE = 22; // kg CO2 per tree per year

  const handleCalculate = () => {
    if (!fuelEfficiency || !annualUsage) {
      alert('Please provide both fuel efficiency and annual usage.');
      return;
    }

    // Convert fuel efficiency to kmpl if it's in mpg
    const efficiencyInKmpl =
      fuelEfficiencyUnit === 'mpg' ? fuelEfficiency * 0.425144 : fuelEfficiency;

    // Convert annual usage to km if it's in miles
    const usageInKm =
      annualUsageUnit === 'miles' ? annualUsage * 1.60934 : annualUsage;

    // Example emission factor (kg CO2 per litre of fuel)
    const emissionFactor = 2.31;

    // Calculate total fuel consumption and emissions
    const totalFuelConsumed = usageInKm / efficiencyInKmpl;
    const totalEmissions = totalFuelConsumed * emissionFactor;

    // Calculate the number of trees needed
    const treesNeeded = Math.ceil(totalEmissions / CO2_ABSORPTION_PER_TREE);

    setEmissions(totalEmissions);
    setTrees(treesNeeded);
  };

  const handleReset = () => {
    setFuelEfficiency('');
    setFuelEfficiencyUnit('kmpl');
    setAnnualUsage('');
    setAnnualUsageUnit('km');
    setEmissions(null);
    setTrees(null);
  };

  const handleFuelEfficiencyUnitChange = (unit) => {
    setFuelEfficiencyUnit(unit);

    // Automatically adjust annual usage unit based on fuel efficiency unit
    if (unit === 'kmpl') {
      setAnnualUsageUnit('km');
    } else if (unit === 'mpg') {
      setAnnualUsageUnit('miles');
    }
  };

  return (
    <div className="container">
      <h1>Carbon Offset Calculator</h1>

      <div>
        <label>Fuel Efficiency:</label>
        <input
          type="number"
          value={fuelEfficiency}
          onChange={(e) => setFuelEfficiency(e.target.value)}
        />
        <select
          value={fuelEfficiencyUnit}
          onChange={(e) => handleFuelEfficiencyUnitChange(e.target.value)}
        >
          <option value="kmpl">KMPL</option>
          <option value="mpg">MPG</option>
        </select>
      </div>
      <br></br>

      <div>
        <label>Annual Usage:</label>
        <input
          type="number"
          value={annualUsage}
          onChange={(e) => setAnnualUsage(e.target.value)}
          disabled={!fuelEfficiency} // Disable if fuel efficiency is not valid
        />
        <select
          value={annualUsageUnit}
          onChange={(e) => setAnnualUsageUnit(e.target.value)}
          disabled={!fuelEfficiency} // Disable if fuel efficiency is not valid
        >
          {fuelEfficiencyUnit === 'kmpl' && <option value="km">Kilometers</option>}
          {fuelEfficiencyUnit === 'mpg' && <option value="miles">Miles</option>}
        </select>
      </div>
      <br></br>

      <div>
        <button onClick={handleCalculate}>Calculate</button>
        <button
          onClick={handleReset}
          style={{ marginLeft: '1rem', backgroundColor: '#888', color: '#fff' }}
        >
          Reset
        </button>
      </div>
      <br></br>

      {emissions !== null && (
        <div>
          <h2>Estimated Annual Emissions:</h2>
          <p>{emissions.toFixed(2)} kg CO2</p>
        </div>
      )}

      {trees !== null && (
        <div>
          <h2>Trees Needed to Offset Emissions:</h2>
          <p>🌳 You need to plant <strong>{trees}</strong> trees to offset this year's car emissions.</p>
        </div>
      )}
    </div>
  );
};

export default App;