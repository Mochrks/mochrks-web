import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/home-page";
import Article from "../pages/article-page";
import Photography from "../pages/photography-page";
import Project from "../pages/project-page";
import Design from "../pages/design-page";
import UIUXDesign from "../pages/uiux-page";
import { ComponentNotFound } from "@/components/demo/NotFound";

const _Routes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/article" element={<Article />} />
        <Route exact path="/photography" element={<Photography />} />
        <Route exact path="/project" element={<Project />} />
        <Route exact path="/design-artwork" element={<Design />} />
        <Route exact path="/ui-ux-design" element={<UIUXDesign />} />
        <Route exact path="/*" element={<ComponentNotFound />} />
      </Routes>
    </Router>
  );
};

export default _Routes;
