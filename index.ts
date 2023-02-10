import { Gpio } from "onoff"
import { io } from "socket.io-client"

var led = new Gpio(21, "out")

const socket = io("https://masterapi.legab.ninja")

socket.on("connect", () => {
    console.log("connected")
    socket.on("message", () => {
        console.log("message")
    })

    socket.on("switch", (data) => {
        switch (data) {
            case "on":
                led.writeSync(1)
                console.log("on")
                break
            case "off":
                led.writeSync(0)
                console.log("off")
                break
        }
    })
})
