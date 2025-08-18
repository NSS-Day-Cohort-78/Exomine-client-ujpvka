import { Governors } from "./Governors.js"

const render = async () => {
    const governorsHTML = await Governors()

    const container = document.getElementById("container")

    container.innerHTML = `
    <h1>Solar System Mining Marketplace</h1>
    ${governorsHTML}
    `
}

render()
