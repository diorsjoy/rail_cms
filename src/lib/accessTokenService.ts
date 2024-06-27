const KEY = "ACCESS_TOKEN";
const RESPONSE_STATUS_KEY = "responseStatus";
const PREVIOUS_PAGE_URL_KEY = "previousPageUrl";

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
  getResponseStatus(): number | null {
    const status = localStorage.getItem(RESPONSE_STATUS_KEY);
    return status ? parseInt(status, 10) : null;
  },
  setResponseStatus(status: number): void {
    localStorage.setItem(RESPONSE_STATUS_KEY, status.toString());
  },
  removeResponseStatus(): void {
    localStorage.removeItem(RESPONSE_STATUS_KEY);
  },
  getPreviousPageUrl(): string | null {
    return localStorage.getItem(PREVIOUS_PAGE_URL_KEY);
  },
  setPreviousPageUrl(url: string): void {
    localStorage.setItem(PREVIOUS_PAGE_URL_KEY, url);
  },
};
