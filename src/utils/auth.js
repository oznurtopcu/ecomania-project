import { api } from "../api/axios";
import { store } from "../store/store";
import { setUser } from "../store/actions/clientActions";

export const verifyToken = async () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    // Set token in axios headers
    api.defaults.headers.common["Authorization"] = token;

    // Verify token
    const response = await api.get("/verify");

    // Update user in store
    store.dispatch(setUser(response.data));

    // Update token in localStorage and axios headers
    localStorage.setItem("token", response.data.token);
    api.defaults.headers.common["Authorization"] = response.data.token;

    return true;
  } catch (error) {
    // Clear invalid token
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    return false;
  }
};
