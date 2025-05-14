import RecipeBrowser from "./pages/RecipeBrowser/RecipeBrowser.jsx";
import Home from "./pages/Home/Home.jsx";
import BottomNav from "./components/BottomNav/BottomNav.jsx";

import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe-browser" element={<RecipeBrowser />} />
      </Routes>
      <BottomNav />
    </>
  );
}

export default App;
