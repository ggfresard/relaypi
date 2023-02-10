import { Gpio } from "pigpio"
import { io } from "socket.io-client"

var relay = new Gpio(21, {
    mode: Gpio.OUTPUT,
})

var state = 0

setInterval(() => {
    relay.digitalWrite(state)
    state = state ? 0 : 1
}, 1000)

const socket = io("https://masterapi.legab.ninja")

// socket.on("connect", () => {
//     console.log("connected")
//     socket.on("message", () => {
//         console.log("message")
//     })

//     socket.on("switch", (data) => {
//         switch (data) {
//             case "on":
//                 led.writeSync(1)
//                 console.log("on")
//                 break
//             case "off":
//                 led.writeSync(0)
//                 console.log("off")
//                 break
//         }
//     })
// })
