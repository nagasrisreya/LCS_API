import React, { useState } from 'react';
import './App.css';

function App() {
  const [str1, setStr1] = useState('');
  const [str2, setStr2] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAllSubstrings, setShowAllSubstrings] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';
      const endpoint = showAllSubstrings ? '/api/all-substrings' : '/api/lcs';
      const body = showAllSubstrings 
        ? { str1, str2, minLength: 2 }
        : { str1, str2 };

      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.result);
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to connect to server. Make sure the backend is running.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setStr1('');
    setStr2('');
    setResult(null);
    setError('');
  };

  const handleExample = () => {
    setStr1('abcdefg');
    setStr2('xyzabcd');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔍 Longest Common Substring Algorithm</h1>
        <p>Find the longest common substring between two strings</p>
      </header>

      <main className="App-main">
        <div className="input-section">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="str1">First String:</label>
              <input
                type="text"
                id="str1"
                value={str1}
                onChange={(e) => setStr1(e.target.value)}
                placeholder="Enter first string..."
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="str2">Second String:</label>
              <input
                type="text"
                id="str2"
                value={str2}
                onChange={(e) => setStr2(e.target.value)}
                placeholder="Enter second string..."
                required
              />
            </div>

            <div className="options">
              <label>
                <input
                  type="checkbox"
                  checked={showAllSubstrings}
                  onChange={(e) => setShowAllSubstrings(e.target.checked)}
                />
                Show all common substrings
              </label>
            </div>

            <div className="button-group">
              <button type="submit" disabled={loading || !str1 || !str2}>
                {loading ? 'Calculating...' : 'Find LCS'}
              </button>
              <button type="button" onClick={handleExample} className="secondary">
                Load Example
              </button>
              <button type="button" onClick={handleClear} className="secondary">
                Clear
              </button>
            </div>
          </form>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>

        {result && (
          <div className="result-section">
            <h2>Results</h2>
            
            {!showAllSubstrings ? (
              <div className="lcs-result">
                <div className="result-item">
                  <h3>Longest Common Substring:</h3>
                  <p className="lcs-string">"{result.lcs || 'No common substring found'}"</p>
                </div>

                <div className="result-item">
                  <h3>Length:</h3>
                  <p>{result.length} characters</p>
                </div>

                {result.length > 0 && (
                  <div className="result-item">
                    <h3>Position in First String:</h3>
                    <p>Index {result.position1}</p>
                  </div>
                )}

                {result.length > 0 && (
                  <div className="result-item">
                    <h3>Position in Second String:</h3>
                    <p>Index {result.position2}</p>
                  </div>
                )}

                <div className="highlight-section">
                  <div className="highlight-item">
                    <h4>First String Highlight:</h4>
                    <p>
                      {result.lcs ? (
                        <>
                          {str1.substring(0, result.position1)}
                          <span className="highlight">{result.lcs}</span>
                          {str1.substring(result.position1 + result.length)}
                        </>
                      ) : (
                        str1
                      )}
                    </p>
                  </div>

                  <div className="highlight-item">
                    <h4>Second String Highlight:</h4>
                    <p>
                      {result.lcs ? (
                        <>
                          {str2.substring(0, result.position2)}
                          <span className="highlight">{result.lcs}</span>
                          {str2.substring(result.position2 + result.length)}
                        </>
                      ) : (
                        str2
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="all-substrings-result">
                <h3>All Common Substrings (sorted by length):</h3>
                {result.length > 0 ? (
                  <div className="substring-list">
                    {result.map((substring, index) => (
                      <span key={index} className="substring-item">
                        "{substring}" ({substring.length})
                      </span>
                    ))}
                  </div>
                ) : (
                  <p>No common substrings found</p>
                )}
                <p className="total-count">Total: {result.length} substrings</p>
              </div>
            )}
          </div>
        )}

        <div className="info-section">
          <h2>About the Algorithm</h2>
          <div className="algorithm-info">
            <h3>Dynamic Programming Approach</h3>
            <p>
              This implementation uses dynamic programming to solve the Longest Common Substring problem efficiently.
            </p>
            
            <h4>Time Complexity: O(m × n)</h4>
            <p>Where m and n are the lengths of the two input strings.</p>
            
            <h4>Space Complexity: O(min(m, n))</h4>
            <p>Optimized to use space proportional to the smaller string.</p>
            
            <h4>How it Works:</h4>
            <ol>
              <li>Create a DP table where dp[i][j] represents the length of LCS of substrings ending at position i-1 and j-1</li>
              <li>Iterate through both strings character by character</li>
              <li>If characters match, extend the previous common substring length</li>
              <li>Track the maximum length and its position</li>
              <li>Extract the actual substring from the original string</li>
            </ol>
          </div>
        </div>
      </main>

      <footer className="App-footer">
        <p>Longest Common Substring Algorithm - React + Node.js Application</p>
      </footer>
    </div>
  );
}

export default App;

