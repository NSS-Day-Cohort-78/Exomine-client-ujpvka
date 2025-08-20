const colonyState = {
    colonyId: 0,
    mineralId: 0,
    tons: 0
}
const facilityState = {
    miningFacilityId: 0,
    mineralId: 0,
    tons: 0
}

let facilityInventoryId = 0

export const setFacilityInventoryId = (choice) => {
    facilityInventoryId = choice
}

export const setFacilityId = (id) => {
    document.dispatchEvent(new CustomEvent("stateChanged"))
    facilityState.miningFacilityId = id
}

export const setFacilityMineralId = (id) => {
    document.dispatchEvent(new CustomEvent("stateChanged"))
    facilityState.mineralId = id
}

export const setFacilityTons = (tons) => {
    facilityState.tons = tons
}

export const setColonyId = (id) => {
    colonyState.colonyId = id
    document.dispatchEvent(new CustomEvent("stateChanged"))
    console.log(colonyState)
}

export const setColonyMineralId = (id) => {
    colonyState.mineralId = id
    console.log(colonyState)
}

export const setColonyTons = (tons) => {
    colonyState.tons = tons
    console.log(colonyState)
}

export const purchaseMineral = async () => {
    // we need to get colony inventory data
    // check if it already has some of the minerals
    // if it does get the minerals tons and id
    // add tons + 1 to transient state colony tons
    // Put method with colony inventory ID
    const response = await fetch("http://localhost:8088/colonyInventory")
    const colonyInventory = await response.json()

    let colonyInventoryId = 0
    const filteredInventory = colonyInventory.filter((inventory) => {
        return (
            inventory.mineralId === colonyState.mineralId &&
            inventory.colonyId === colonyState.colonyId
        )
    })

    if (colonyState.colonyId > 0 || colonyState.mineralId > 0) {
        if (filteredInventory.length > 0) {
            const url = "http://localhost:8088/colonyInventory"
            colonyInventoryId = filteredInventory[0].id
            const tons = filteredInventory[0].tons + 1
            setColonyTons(tons)
            await putData(url, colonyInventoryId, colonyState)
            // PUT we need colonyInventory id
        } else {
            setColonyTons(1)
            await postData()
            // POST
        }
        const facilityUrl = "http://localhost:8088/facilityInventory"

        await putData(facilityUrl, facilityInventoryId, facilityState)
    }

    // Put method with FacilityInventory Id

    /*
        Does the chosen governor's colony already own some of this mineral?
            - If yes, what should happen?
            - If no, what should happen?

        Defining the algorithm for this method is traditionally the hardest
        task for teams during this group project. It will determine when you
        should use the method of POST, and when you should use PUT.

        Only the foolhardy try to solve this problem with code.
    */

    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getColonyTransientState = () => {
    return structuredClone(colonyState)
}

export const getFacilityTransientState = () => {
    return structuredClone(facilityState)
}

const postData = async () => {
    const response = await fetch("http://localhost:8088/colonyInventory", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(colonyState)
    })
}

const putData = async (url, id, data) => {
    const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

export const resetTransientState = () => {
    colonyState.mineralId = 0
    facilityState.mineralId = 0
}
