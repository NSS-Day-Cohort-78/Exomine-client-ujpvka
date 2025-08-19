import { Facilities } from "./Facilities.js"
import { Governors } from "./Governors.js"

const render = async () => {
    const governorsHTML = await Governors()
    const miningFacilitiesHTML = await Facilities()

    const container = document.getElementById("container")

    container.innerHTML = `
    <h1>Solar System Mining Marketplace</h1>
    ${governorsHTML}
    ${miningFacilitiesHTML}
    `
}

render()
