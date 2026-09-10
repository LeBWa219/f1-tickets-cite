const BASE_URL = "http://localhost:8080/api";

export const api = {
  async getRaces() {
    const response = await fetch(`${BASE_URL}/races`);
    if (!response.ok) {
      throw new Error("Не удалось загрузить список гонок");
    }
    return response.json();
  },

  async login(login: string, password: string) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });
    if (!response.ok) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  },
};
