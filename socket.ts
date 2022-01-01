import io from "socket.io-client";
import { API_URL } from "./config";

export const socket = io(API_URL);
let id = 0;
if (typeof window !== "undefined") {
  id = parseInt(localStorage.getItem("id"));
}
