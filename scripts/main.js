import { Facilities } from "./Facilities.js"
import { Governors } from "./Governors.js"
import { ColoniesInventory } from "./ColoniesInventory.js"
import { SpaceCart } from "./SpaceCart.js"

const render = async () => {
    const governorsHTML = await Governors()
    const miningFacilitiesHTML = await Facilities()
    const colonyInventoryHTML = await ColoniesInventory()
    const spaceCartHtml = await SpaceCart()

    const container = document.getElementById("container")

    container.innerHTML = `
    <h1>Solar System Mining Marketplace</h1>
    ${governorsHTML}
    ${miningFacilitiesHTML}
    ${colonyInventoryHTML}
    ${spaceCartHtml}
    `
}

render()
document.addEventListener("stateChanged", render)
