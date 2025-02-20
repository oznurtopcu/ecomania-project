import { api } from "../api/axios";
import { store } from "../store/store";
import { setUser } from "../store/actions/clientActions";

export const verifyToken = async () => {
  // Check both localStorage and sessionStorage for token
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) return false;

  try {
    // Set token in axios headers
    api.defaults.headers.common["Authorization"] = token;

    // Verify token
    const response = await api.get("/verify");

    // Update user in store
    store.dispatch(setUser(response.data));

    // Update token in the same storage it was found in
    if (localStorage.getItem("token")) {
      localStorage.setItem("token", response.data.token);
    } else {
      sessionStorage.setItem("token", response.data.token);
    }

    api.defaults.headers.common["Authorization"] = response.data.token;

    return true;
  } catch (error) {
    // Clear invalid token
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    return false;
  }
};
