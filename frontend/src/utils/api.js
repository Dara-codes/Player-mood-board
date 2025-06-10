import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const submitMood = async (emoji) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/mood`, { emoji });
    return response.data;
  } catch (error) {
    throw new Error("Failed to submit mood");
  }
};

export const getMoods = async (date = null) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/moods`, {
      params: date ? { date } : {},
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch moods");
  }
};
