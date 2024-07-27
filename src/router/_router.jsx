import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home-page";

const _Routes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default _Routes;
