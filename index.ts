import { io } from "socket.io-client"

const socket = io("https://masterapi.legab.ninja")

socket.on("connect", () => {
    console.log("connected")
    socket.on("message", () => {
        console.log("message")
    })

    socket.on("switch", (data) => {
        console.log(data)
    })
})
