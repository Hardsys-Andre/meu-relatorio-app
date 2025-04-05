const API_URL = "https://meu-relatorio-backend.vercel.app"; // Substitua pelo endereço do seu backend

const api = {
  async get(endpoint) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "GET",
      credentials: "include", // Se precisar enviar cookies
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },

  async post(endpoint, data) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async put(endpoint, data) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async delete(endpoint) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  },

  async logout() {
    return fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
  }
};

export default api;
