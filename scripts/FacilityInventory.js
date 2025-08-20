// Facility Inventory:
// - governor is selected (change event triggered by gov selection for the associated colony to appear)

// - after facility is chosen, then the minerals associated with the facility appear with radio buttons - middle section 1st, value of button sent to transientState

// - once minerals are selected the Purchase mineral button is enabled AND 1 ton is deducted from facilityMinerals and 1 ton is added to the colony's inventory

import {
    setColonyMineralId,
    setFacilityMineralId,
    getFacilityTransientState,
    setFacilityTons
} from "./TransientState.js"

const handleChange = (changeEvent) => {
    if (changeEvent.target.name === "choose-inventory") {
        const convertedToNumber = parseInt(changeEvent.target.value)
        let tons = parseInt(changeEvent.target.dataset.tons)
        tons--
        setFacilityTons(tons)
        setColonyMineralId(convertedToNumber)
        setFacilityMineralId(convertedToNumber)
    }
}

export const FacilityInventory = async () => {
    document.addEventListener("change", handleChange)
    const response = await fetch(
        "http://localhost:8088/facilityInventory?_expand=mineral&_expand=miningFacility"
    )
    const inventoryItems = await response.json()

    const facilityTransientState = getFacilityTransientState()
    let matchedFacility = []

    for (const item of inventoryItems) {
        if (item.miningFacilityId === facilityTransientState.miningFacilityId) {
            matchedFacility.push(item)
        }
    }

    let html = `
        <div class="Facility-Inventory-input">
     
        `
    if (facilityTransientState.miningFacilityId > 0) {
        html += `<h2>Facility Minerals for ${matchedFacility[0].miningFacility.name}</h2>`
    } else {
        html += `<h2>Facility Minerals</h2>`
    }

    const divStringArray = matchedFacility.map((facility) => {
        if (facility.tons > 0) {
            const checked =
                facility.mineralId === facilityTransientState.mineralId
                    ? "checked"
                    : ""
            return `<div>
            <input type="radio" name="choose-inventory" ${checked} value="${facility.mineralId}" data-tons="${facility.tons}" /> ${facility.tons} tons of ${facility.mineral.name}
    
            </div>`
        }
    })
    html += divStringArray.join("")

    html += `
        </div>
        `
    return html
}
