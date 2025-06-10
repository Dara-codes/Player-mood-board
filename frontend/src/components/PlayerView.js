import React, { useState } from "react";
import { submitMood } from "../utils/api";

const PlayerView = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const moods = [
    { emoji: "😃", value: "happy", label: "Happy", color: "bg-green-500" },
    { emoji: "😐", value: "neutral", label: "Neutral", color: "bg-yellow-500" },
    { emoji: "😞", value: "sad", label: "Sad", color: "bg-red-500" },
  ];

  const handleMoodSubmit = async (mood) => {
    setIsSubmitting(true);
    setSelectedMood(mood.value);

    try {
      await submitMood(mood.value);
      setShowThankYou(true);

      // Reset after 3 seconds
      setTimeout(() => {
        setShowThankYou(false);
        setSelectedMood(null);
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      alert("Failed to submit mood. Please try again.");
      setIsSubmitting(false);
      setSelectedMood(null);
    }
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center animate-bounce-in">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
          <p className="text-gray-600">Your mood has been recorded.</p>
          <div className="mt-4 w-8 h-8 mx-auto">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            How was training?
          </h1>
          <p className="text-gray-600">Tap an emoji to share your mood</p>
        </div>

        <div className="space-y-4">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => handleMoodSubmit(mood)}
              disabled={isSubmitting}
              className={`w-full p-6 rounded-2xl border-2 border-gray-200 hover:border-gray-300 
                         transition-all duration-300 transform hover:scale-105 active:scale-95
                         ${
                           selectedMood === mood.value
                             ? "ring-4 ring-blue-300"
                             : ""
                         }
                         ${
                           isSubmitting
                             ? "opacity-50 cursor-not-allowed"
                             : "hover:shadow-lg"
                         }`}
            >
              <div className="flex items-center justify-center space-x-4">
                <span className="text-4xl">{mood.emoji}</span>
                <span className="text-xl font-semibold text-gray-700">
                  {mood.label}
                </span>
              </div>
            </button>
          ))}
        </div>

        {isSubmitting && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
              <span className="text-gray-600">Submitting...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerView;
