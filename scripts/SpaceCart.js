import { getFacilityTransientState } from "./TransientState.js"
import { PurchaseButton } from "./PurchaseButton.js"

export const spaceCart = async () => {
    const response = await fetch(
        "http://localhost:8088/facilityInventory?_expand=mineral&_expand=miningFacility"
    )
    const facilityInventoryData = await response.json()
    const facilityTransientState = getFacilityTransientState()

    let html = `
        <section class="space-cart">
            <h2>Space Cart</h2>
        `

    if (facilityTransientState.mineralId > 0) {
        const filtered = facilityInventoryData.filter(
            (item) => item.mineralId === facilityTransientState.mineralId
        )
        for (const match of filtered) {
            
        }
    }

    html += `
        ${PurchaseButton()}
        </section>
        `

    return html
}


// if (facilityTransientState.mineralId > 0) {
//     html += `
//         1 ton of ${facilityInventoryData.mineral.name} from ${facilityInventoryData.miningFacility.name}
//         `
// }
