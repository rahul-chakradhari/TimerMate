import React, { useState, useEffect } from "react";

// Dummy local storage helper
const getSavedTimers = () => {
  const data = localStorage.getItem("timers");
  return data ? JSON.parse(data) : [];
};

const Home = () => {
  const [timers, setTimers] = useState(getSavedTimers());
  const [newTimer, setNewTimer] = useState({
    name: "",
    duration: "",
    category: "",
  });

  useEffect(() => {
    localStorage.setItem("timers", JSON.stringify(timers));
  }, [timers]);

  const handleChange = (e) => {
    setNewTimer({ ...newTimer, [e.target.name]: e.target.value });
  };

  const addTimer = () => {
    if (!newTimer.name || !newTimer.duration || !newTimer.category) return;

    setTimers([
      ...timers,
      {
        ...newTimer,
        id: Date.now(),
        remaining: parseInt(newTimer.duration),
        status: "Not Started",
        // Initialize custom alert properties
        customAlertPercentage: 50, // Default to 50% completion alert
        customAlertEnabled: true, // Default to true
        customAlertTriggered: false, // To prevent multiple alerts for the same percentage
        completed: false,
      },
    ]);
    setNewTimer({ name: "", duration: "", category: "" });
  };

  const groupedTimers = timers.reduce((acc, timer) => {
    acc[timer.category] = acc[timer.category] || [];
    acc[timer.category].push(timer);
    return acc;
  }, {});

  const startTimer = (id) => {
    // Clear any existing interval to prevent multiple intervals for the same timer
    setTimers((prev) =>
      prev.map((t) => {
        if (t.id === id && t.intervalId) {
          clearInterval(t.intervalId);
        }
        return t;
      })
    );

    const intervalId = setInterval(() => {
      setTimers((prev) =>
        prev.map((t) => {
          if (t.id === id && t.remaining > 0 && t.status === "Running") {
            const elapsedTime = t.duration - t.remaining;
            const currentCompletionPercentage =
              (elapsedTime / t.duration) * 100;

            // Custom Alert Logic: Trigger when current completion >= customAlertPercentage
            if (
              t.customAlertEnabled &&
              !t.customAlertTriggered &&
              currentCompletionPercentage >= t.customAlertPercentage
            ) {
              alert(
                `🔔 Custom Alert: ${t.name} has completed ${t.customAlertPercentage}% of its duration!`
              );
              // Set customAlertTriggered to true to prevent re-triggering for this specific percentage
              return {
                ...t,
                remaining: t.remaining - 1,
                customAlertTriggered: true,
              };
            }

            return { ...t, remaining: t.remaining - 1 };
          } else if (
            t.id === id &&
            t.remaining === 0 &&
            t.status !== "Completed"
          ) {
            clearInterval(intervalId);
            t.status = "Completed";

            // Save completed timer to history
            const completedTimers =
              JSON.parse(localStorage.getItem("completedTimers")) || [];
            completedTimers.push({
              name: t.name,
              category: t.category,
              completedAt: new Date().toISOString(),
            });
            localStorage.setItem(
              "completedTimers",
              JSON.stringify(completedTimers)
            );

            alert(`✅ Timer Completed: ${t.name}`);
            return { ...t };
          }
          return t;
        })
      );
    }, 1000);

    setTimers((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: "Running", intervalId } : t
      )
    );
  };

  const pauseTimer = (id) => {
    setTimers((prev) =>
      prev.map((t) => {
        if (t.id === id && t.intervalId) {
          clearInterval(t.intervalId);
          return { ...t, status: "Paused", intervalId: null };
        }
        return t;
      })
    );
  };

  const resetTimer = (id) => {
    setTimers((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              remaining: parseInt(t.duration),
              status: "Not Started",
              customAlertTriggered: false, // Reset custom alert trigger on reset
            }
          : t
      )
    );
  };

  const handleBulkAction = (category, action) => {
    const timerIds = groupedTimers[category].map((t) => t.id);
    timerIds.forEach((id) => {
      if (action === "start") startTimer(id);
      if (action === "pause") pauseTimer(id);
      if (action === "reset") resetTimer(id);
    });
  };

  return (
    <div className="container mt-4">
      <h2>Add Timer</h2>
      <div className="row mb-3">
        <div className="col">
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Timer Name"
            value={newTimer.name}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            type="number"
            name="duration"
            placeholder="Duration (seconds)"
            value={newTimer.duration}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            type="text"
            name="category"
            placeholder="Category"
            value={newTimer.category}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <button className="btn btn-success" onClick={addTimer}>
            Save Timer
          </button>
        </div>
      </div>

      <h2>Timers</h2>
      {Object.keys(groupedTimers).map((category) => (
        <div key={category} className="mb-4">
          <h4>{category}</h4>
          <div className="mb-2">
            <button
              className="btn btn-primary btn-sm me-2"
              onClick={() => handleBulkAction(category, "start")}
            >
              Start All
            </button>
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => handleBulkAction(category, "pause")}
            >
              Pause All
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => handleBulkAction(category, "reset")}
            >
              Reset All
            </button>
          </div>
          {groupedTimers[category].map((timer) => (
            <div
              key={timer.id}
              className="card p-2 mb-2"
              style={{ backgroundColor: "#f9f9f9" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{timer.name}</strong>
                  <div>Status: {timer.status}</div>
                  <div>Remaining: {timer.remaining}s</div>
                  <div>
                    Progress:{" "}
                    {Math.round(
                      ((timer.duration - timer.remaining) / timer.duration) *
                        100
                    )}
                    %
                  </div>
                </div>
                <div>
                  <button
                    className="btn btn-outline-primary btn-sm me-2"
                    onClick={() => startTimer(timer.id)}
                  >
                    Start
                  </button>
                  <button
                    className="btn btn-outline-warning btn-sm me-2"
                    onClick={() => pauseTimer(timer.id)}
                  >
                    Pause
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => resetTimer(timer.id)}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
