import "./App.css";
import AddVideo from "./components/addVideoInitial/AddVideo";
import Header from "./components/header/Header";
import Login from "./pages/Login/Login";
import MainDashboard from "./pages/MainDashboard/MainDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // const bears = useBearStore((state) => state.bears);
  // const increase = useBearStore((state) => state.increasePopulation);

  return (
    <div className="dashboardContainer">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddVideo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<MainDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
