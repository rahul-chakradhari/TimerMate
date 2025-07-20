import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import TimerHistory from "./components/TimerHistory";
import Alerts from "./components/Alerts";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/alerts" element={<Alerts />} />
        <Route exact path="/history" element={<TimerHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
