import "./App.css";
import AddVideo from "./components/addVideoInitial/AddVideo";
import Header from "./components/header/Header";
import Login from "./pages/Login/Login";
import MainDashboard from "./pages/MainDashboard/MainDashboard";
import DhunAi from "./pages/DhunAi/DhunAi";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from "react";
import AudioPlayer from "./components/audioPlayer/AudioPlayer";

function App() {
  // const bears = useBearStore((state) => state.bears);
  // const increase = useBearStore((state) => state.increasePopulation);

  return (
    <div>
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddVideo />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <main className="dashboardContainer">
                <Header />
                <MainDashboard />
                <AudioPlayer />
              </main>
            }
          />
          <Route path="/dhunai" element={<DhunAi />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
