import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home, Login, Notes, Register } from ".";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Notes />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
