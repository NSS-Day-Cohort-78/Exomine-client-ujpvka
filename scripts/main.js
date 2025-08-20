import { Facilities } from "./Facilities.js"
import { Governors } from "./Governors.js"
import { ColoniesInventory } from "./ColoniesInventory.js"
import { SpaceCart } from "./SpaceCart.js"
import { FacilityInventory } from "./FacilityInventory.js"

const render = async () => {
    const governorsHTML = await Governors()
    const miningFacilitiesHTML = await Facilities()
    const colonyInventoryHTML = await ColoniesInventory()
    const facilityInventoryHTML = await FacilityInventory()
    const spaceCartHtml = await SpaceCart()

    const container = document.getElementById("container")

    container.innerHTML = `
    
    <header>
        <h1>Solar System Mining Marketplace</h1>
    </header>
    <div class='flex-container'>
        <div class="dropdowns-container">
            ${governorsHTML}
            ${miningFacilitiesHTML}
        </div>
        ${colonyInventoryHTML}
    </div>
    <div class='flex-container'>
        ${facilityInventoryHTML}
        ${spaceCartHtml}
    </div>
    `
}

render()
document.addEventListener("stateChanged", render)
