import { io } from "socket.io-client"

const socket = io("http://localhost:81")

socket.on("connect", () => {
    console.log("connected")
    socket.emit("create_game", { name: "test" })
})
