import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export function useHttp() {
  return http;
}

export function setAuth(user: string, pass: string) {
  http.defaults.auth = { username: user, password: pass };
}
