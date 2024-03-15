import "./App.css";
// import AddVideo from "./components/addVideoInitial/AddVideo";
import Header from "./components/header/Header";
import Login from "./pages/Login/Login";
import MainDashboard from "./pages/MainDashboard/MainDashboard";
import DhunAi from "./pages/DhunAi/DhunAi";
// import RegisterPage from "./pages/Register/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as React from "react";
import AudioPlayer from "./components/audioPlayer/AudioPlayer";
import ResponsibleAiPage from "./pages/StaticPages/ResponsibleAi";
import PrivacyPolicyPage from "./pages/StaticPages/PrivacyPolicy";
import DisclaimerPage from "./pages/StaticPages/Disclaimer";
import Footer from "./components/footer/footer";
import HomeHeader from "./components/homeHeader/homeHeader";
import HomePageHeader from "./components/homePageHeader/homePageHeader";

function App() {
  return (
    <div>
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<AddVideo />} /> */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/editor-dashboard"
            element={
              <main className="dashboardContainer">
                <HomePageHeader />
                <MainDashboard />
                <AudioPlayer />
              </main>
            }
          />
          <Route path="/" element={<DhunAi />} />
          <Route
            path="/ResponsibleAi"
            element={
              <main className="dashboardContainer">
                <HomePageHeader />
                <ResponsibleAiPage />
                {/* <Footer /> */}
              </main>
            }
          />
          <Route
            path="/PrivacyPolicy"
            element={
              <main className="dashboardContainer">
                <HomePageHeader />
                <PrivacyPolicyPage />
                <Footer />
              </main>
            }
          />
          <Route
            path="/Disclaimer"
            element={
              <main className="dashboardContainer">
                <HomePageHeader />
                <DisclaimerPage />
                <Footer />
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
