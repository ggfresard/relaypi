import { Gpio } from "onoff"
import { io } from "socket.io-client"
import dns from "dns"

var relay = new Gpio(21, "high")

var state: 0 | 1 = 0

relay.writeSync(state)

var checker = setInterval(async () => {
    if (!!(await dns.promises.resolve("google.com").catch(() => {}))) {
        init()
        clearInterval(checker)
    } else {
        console.log("no internet")
    }
}, 1000)

const init = async () => {
    const socket = io("https://masterapi.legab.ninja")

    const update = () => {
        relay.writeSync(state)
    }
    socket.on("connect", async () => {
        console.log("connected")

        relay.writeSync(1)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        relay.writeSync(0)

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
