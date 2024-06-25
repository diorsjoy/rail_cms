const KEY = "ACCESS_TOKEN";

export const accessTokenService = {
  get() {
    return localStorage.getItem(KEY);
  },
  remove() {
    localStorage.removeItem(KEY);
  },
  set(token: string) {
    localStorage.setItem(KEY, token);
  },
};
