export let API_URL = "https://lpite-back.herokuapp.com/";
if (process.env.NODE_ENV === "development") {
  API_URL = "http://46.63.31.3:3002/";
}
export const appVersion = "0.0.1";
