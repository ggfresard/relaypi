import { Gpio } from "onoff"
import { io } from "socket.io-client"

var relay = new Gpio(21, "high")

relay.writeSync(0)

const socket = io("https://masterapi.legab.ninja")

socket.on("connect", () => {
    console.log("connected")
    socket.on("message", () => {
        console.log("message")
    })

    socket.on("switch", (data) => {
        switch (data) {
            case "on":
                relay.writeSync(1)
                console.log("on")
                break
            case "off":
                relay.writeSync(0)
                console.log("off")
                break
        }
    })
})
