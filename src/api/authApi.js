import apiClient from "./apiClient";

// LOGIN
export const loginUser = async (userData) => {
  try {
    const response = await apiClient.post("/public/login", userData);
    return response.data; 
  } catch (error) {
    throw error.response?.data || "Login failed";
  }
};

// SIGNUP
export const signupUser = async (userData) => {
  try {
    const response = await apiClient.post("/public/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Signup failed";
  }
};