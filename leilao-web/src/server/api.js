import { io } from "socket.io-client";

const client = io("http://localhost:5000");

export default client;