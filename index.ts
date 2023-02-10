import { Gpio } from "onoff"
import { io } from "socket.io-client"

var relay = new Gpio(21, "high")

var state: 0 | 1 = 0

relay.writeSync(state)

var checker = setInterval(async () => {
    if (
        !!(await require("dns")
            .promises.resolve("google.com")
            .catch(() => {}))
    ) {
        init()
        clearInterval(checker)
    }
}, 1000)

const init = async () => {
    const socket = io("https://masterapi.legab.ninja")

    const update = () => {
        relay.writeSync(state)
    }
    socket.on("connect", () => {
        console.log("connected")

        socket.on("request_state", () => {
            socket.emit("return_state", state)
        })

        socket.on("switch", (data) => {
            switch (data) {
                case "on":
                    state = 1

                    console.log("on")
                    break
                case "off":
                    state = 0
                    console.log("off")
                    break
            }
            update()
        })
    })
}
