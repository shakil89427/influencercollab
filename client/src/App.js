import { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import BlogDetails from "./Pages/BlogDetails";
import LandingApp from "./Pages/LandingApp";
import Email from "./Pages/Email";
import AdsApi from "./Pages/AdsApi";

function App() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogdetails/:id" element={<BlogDetails />} />
      <Route path="/app" element={<LandingApp />} />
      <Route path="/email" element={<Email />} />
      <Route path="/adsapi" element={<AdsApi />} />
    </Routes>
  );
}

export default App;
