import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PlayerView from "./components/PlayerView";
import CoachView from "./components/CoachView";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Soccer Mood Board
        </h1>
        <p className="text-gray-600 mb-8">Choose your role to continue</p>

        <div className="space-y-4">
          <Link
            to="/player"
            className="block w-full p-4 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors transform hover:scale-105"
          >
            <div className="text-2xl mb-2">⚽</div>
            <div className="font-semibold">I'm a Player</div>
          </Link>

          <Link
            to="/coach"
            className="block w-full p-4 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-colors transform hover:scale-105"
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold">I'm a Coach</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player" element={<PlayerView />} />
          <Route path="/coach" element={<CoachView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
