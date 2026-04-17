import api from "./api";

export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    if (response.token) {
      localStorage.setItem("token", response.token);
    }
    return response;
  },

  register: async (name, email, password) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
      role: "student",
    });
    if (response.token) {
      localStorage.setItem("token", response.token);
    }
    return response;
  },

  logout: async () => {
    localStorage.removeItem("token");
    return { success: true };
  },

  getMe: async () => {
    return api.get("/auth/me");
  },

  changePassword: async (currentPassword, newPassword) => {
    return api.post("/auth/change-password", { currentPassword, newPassword });
  },
};

export default authService;
