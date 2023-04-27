import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const URL = "http://localhost:3000";
const master = io(URL);

master.onAny((event, ...args) => {
    console.log('SOCKET MASTER', event, args);
});

master.on("connect_error", (err) => {
    console.log(`SOCKET MASTER connect_error due to ${err.message}`);
});

export default { master };