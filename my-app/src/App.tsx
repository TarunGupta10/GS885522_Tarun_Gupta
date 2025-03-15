import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SKUPage from "./pages/SKUPage";
import StoresPage from "./pages/StoresPage";
import PlanningPage from "./pages/PlanningPage";
import ChartPage from "./pages/ChartPage";
import "./index.css";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/sku" element={<SKUPage />} />
            <Route path="/planning" element={<PlanningPage />} />
            <Route path="/chart" element={<ChartPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
