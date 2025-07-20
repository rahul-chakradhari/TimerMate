import React, { useEffect, useState } from "react";

const TimerHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("completedTimers")) || [];
    setHistory(stored);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Timer History</h2>
      {history.length === 0 ? (
        <p>No completed timers yet.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr>
              <th>Timer Name</th>
              <th>Category</th>
              <th>Completed At</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{new Date(item.completedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TimerHistory;
