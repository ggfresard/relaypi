import { Gpio } from "pigpio"
import { io } from "socket.io-client"

var relay = new Gpio(21, {
    mode: Gpio.OUTPUT,
})
var pwm = new Gpio(12, {
    mode: Gpio.OUTPUT,
})

relay.digitalWrite(1)

pwm.pwmWrite(100)

setTimeout(() => {
    pwm.pwmWrite(0)
}, 4000)

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
