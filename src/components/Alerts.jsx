import React, { useEffect, useState } from "react";

// Dummy local storage helper - In a React Native app, replace with AsyncStorage
const getSavedTimers = () => {
  const data = localStorage.getItem("timers");
  return data ? JSON.parse(data) : [];
};

const Alerts = () => {
  // We'll manage a local state for alerts, derived from saved timers
  const [alertsConfig, setAlertsConfig] = useState([]);

  useEffect(() => {
    // Load timers when the component mounts
    const savedTimers = getSavedTimers();
    // Initialize alertsConfig from saved timers, ensuring default values
    const initialAlerts = savedTimers.map((timer) => ({
      id: timer.id,
      name: timer.name,
      category: timer.category,
      duration: timer.duration, // Keep duration to show context
      // Ensure these properties exist, even if not explicitly saved before
      customAlertPercentage:
        timer.customAlertPercentage !== undefined
          ? timer.customAlertPercentage
          : 50,
      customAlertEnabled:
        timer.customAlertEnabled !== undefined
          ? timer.customAlertEnabled
          : true,
    }));
    setAlertsConfig(initialAlerts);
  }, []);

  // Function to save the updated alerts config back to localStorage
  // This will update the 'timers' array in localStorage
  const saveAlertsConfig = (updatedAlerts) => {
    // Get all timers from localStorage
    const allTimers = getSavedTimers();
    // Map over all timers and update the alert properties for those present in updatedAlerts
    const newTimersState = allTimers.map((timer) => {
      const updatedAlert = updatedAlerts.find((alert) => alert.id === timer.id);
      if (updatedAlert) {
        return {
          ...timer,
          customAlertPercentage: updatedAlert.customAlertPercentage,
          customAlertEnabled: updatedAlert.customAlertEnabled,
          // Ensure customAlertTriggered is reset if percentage or enabled status changes
          customAlertTriggered: false, // This will be handled by Home.jsx on timer start/reset
        };
      }
      return timer; // Return original timer if not found in updatedAlerts
    });
    localStorage.setItem("timers", JSON.stringify(newTimersState));
    setAlertsConfig(updatedAlerts); // Update local state for immediate UI reflection
  };

  // Handle changes to a specific timer's alert percentage
  const handlePercentageChange = (id, value) => {
    const updatedAlerts = alertsConfig.map((alert) => {
      if (alert.id === id) {
        // Ensure value is a number and within 0-100
        const parsedValue = parseInt(value);
        const validPercentage = isNaN(parsedValue)
          ? 0
          : Math.max(0, Math.min(100, parsedValue));
        return { ...alert, customAlertPercentage: validPercentage };
      }
      return alert;
    });
    saveAlertsConfig(updatedAlerts); // Save changes
  };

  // Handle toggling a specific timer's alert enabled status
  const handleToggleEnabled = (id) => {
    const updatedAlerts = alertsConfig.map((alert) => {
      if (alert.id === id) {
        return { ...alert, customAlertEnabled: !alert.customAlertEnabled };
      }
      return alert;
    });
    saveAlertsConfig(updatedAlerts); // Save changes
  };

  return (
    <div className="container mt-4">
      <h2>Customize Alerts</h2>
      <p>
        Adjust the alert percentage and enable/disable alerts for your timers.
      </p>

      {alertsConfig.length === 0 ? (
        <p>
          No timers available to set alerts. Please add some timers on the Home
          screen.
        </p>
      ) : (
        <div className="list-group">
          {alertsConfig.map((alertItem) => (
            <div
              key={alertItem.id}
              className="list-group-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 p-3 shadow-sm rounded"
            >
              <div className="mb-2 mb-md-0">
                <h5 className="mb-1">
                  {alertItem.name}{" "}
                  <small className="text-muted">({alertItem.category})</small>
                </h5>
                <p className="mb-1">Duration: {alertItem.duration} seconds</p>
              </div>
              <div className="d-flex align-items-center flex-wrap gap-3">
                <div className="form-check form-switch d-flex align-items-center">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id={`toggle-${alertItem.id}`}
                    checked={alertItem.customAlertEnabled}
                    onChange={() => handleToggleEnabled(alertItem.id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`toggle-${alertItem.id}`}
                  >
                    {alertItem.customAlertEnabled
                      ? "Alert Enabled"
                      : "Alert Disabled"}
                  </label>
                </div>
                <div className="input-group" style={{ width: "150px" }}>
                  <input
                    type="number"
                    className="form-control"
                    value={alertItem.customAlertPercentage}
                    onChange={(e) =>
                      handlePercentageChange(alertItem.id, e.target.value)
                    }
                    min="0"
                    max="100"
                    disabled={!alertItem.customAlertEnabled} // Disable input if alert is disabled
                    aria-label="Alert Percentage"
                  />
                  <span className="input-group-text">%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Alerts;
