import { Gpio } from "onoff"
import { io } from "socket.io-client"

var relay = new Gpio(21, "high")

var state: 0 | 1 = 0

setInterval(() => {
    relay.writeSync(state)
    console.log(state)
    state = state ? 0 : 1
}, 5000)

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
