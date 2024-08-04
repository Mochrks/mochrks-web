import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home-page";
import Article from "../pages/article-page";
import Photography from "../pages/photography-page";

const _Routes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/article" element={<Article />} />
        <Route exact path="/photography" element={<Photography />} />
      </Routes>
    </Router>
  );
};

export default _Routes;
