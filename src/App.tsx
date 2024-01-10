import "./App.css";
import AddVideo from "./components/addVideoInitial/AddVideo";
import Header from "./components/header/Header";
import Login from "./pages/Login/Login";
import MainDashboard from "./pages/MainDashboard/MainDashboard";
import DhunAi from "./pages/DhunAi/DhunAi";
import RegisterPage from "./pages/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from "react";
import AudioPlayer from "./components/audioPlayer/AudioPlayer";

function App() {
  return (
    <div>
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<AddVideo />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route
            path="/editor-dashboard"
            element={
              <main className="dashboardContainer">
                <Header />
                <MainDashboard />
                <AudioPlayer />
              </main>
            }
          />
          <Route path="/" element={<DhunAi />} />
          <Route path="/Register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
