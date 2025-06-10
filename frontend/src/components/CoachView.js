import React, { useState, useEffect } from "react";
import { getMoods } from "../utils/api";

const CoachView = () => {
  const [moodData, setMoodData] = useState({ happy: 0, neutral: 0, sad: 0 });
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const handleRefresh = () => {
    // Reset mood stats
    setMoodData({ happy: 0, neutral: 0, sad: 0 });
    // Clear timestamp
    setLastUpdated(null);
    setLoading(true);
    // Fetch fresh data
    setTimeout(() => {
      fetchMoods(selectedDate);
    }, 300);
  };

  const fetchMoods = async (date = null) => {
    try {
      setLoading(true);
      const data = await getMoods(date);
      setMoodData(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Failed to fetch moods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoods(selectedDate);

    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchMoods(selectedDate);
    }, 10000);

    return () => clearInterval(interval);
  }, [selectedDate]);

  const totalMoods = moodData.happy + moodData.neutral + moodData.sad;

  const moodStats = [
    {
      emoji: "😃",
      label: "Happy",
      count: moodData.happy,
      color: "bg-green-500",
      textColor: "text-green-700",
    },
    {
      emoji: "😐",
      label: "Neutral",
      count: moodData.neutral,
      color: "bg-yellow-500",
      textColor: "text-yellow-700",
    },
    {
      emoji: "😞",
      label: "Sad",
      count: moodData.sad,
      color: "bg-red-500",
      textColor: "text-red-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Team Mood Dashboard
              </h1>
              <p className="text-gray-600">
                Monitor your team's training sentiment
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleRefresh}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {moodStats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {stat.count}
                  </p>
                </div>
                <div className="text-4xl">{stat.emoji}</div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 bg-gray-200 rounded-full h-2">
                <div
                  className={`${stat.color} h-2 rounded-full transition-all duration-500`}
                  style={{
                    width:
                      totalMoods > 0
                        ? `${(stat.count / totalMoods) * 100}%`
                        : "0%",
                  }}
                ></div>
              </div>

              <p className="text-sm text-gray-500 mt-2">
                {totalMoods > 0
                  ? `${Math.round((stat.count / totalMoods) * 100)}%`
                  : "0%"}{" "}
                of responses
              </p>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Today's Summary</h2>
            {lastUpdated && (
              <p className="text-sm text-gray-500">
                Last updated: {lastUpdated}
              </p>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : totalMoods > 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl font-bold text-gray-800 mb-2">
                {totalMoods}
              </p>
              <p className="text-gray-600">Total responses received</p>

              {/* Mood indicator */}
              <div className="mt-6">
                {moodData.happy >= moodData.neutral &&
                moodData.happy >= moodData.sad ? (
                  <div className="text-green-600">
                    <div className="text-3xl mb-2">🎉</div>
                    <p className="font-semibold">Team is feeling positive!</p>
                  </div>
                ) : moodData.sad > moodData.happy ? (
                  <div className="text-red-600">
                    <div className="text-3xl mb-2">💪</div>
                    <p className="font-semibold">Team needs support</p>
                  </div>
                ) : (
                  <div className="text-yellow-600">
                    <div className="text-3xl mb-2">⚖️</div>
                    <p className="font-semibold">Mixed feelings today</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">📊</div>
              <p>No mood data available for this date</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoachView;
