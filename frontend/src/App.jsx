import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import Solution from "./pages/Solution";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/solution" element={<Solution />} />
      </Routes>
    </Router>
  );
}

export default App;