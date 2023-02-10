import { Gpio } from "onoff"
import { io } from "socket.io-client"

var relay = new Gpio(21, "out")
var pwm = new Gpio(12, "out")

relay.writeSync(1)

pwm.writeSync(1)

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
