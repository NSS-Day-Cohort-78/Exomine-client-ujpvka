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

export const setFacilityId = (id) => {
    facilityState.miningFacilityId = id
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setFacilityMineralId = (id) => {
    facilityState.mineralId = id
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setFacilityTons = (tons) => {
    facilityState.tons = tons
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setColonyId = (id) => {
    colonyState.miningColonyId = id
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setColonyMineralId = (id) => {
    colonyState.mineralId = id
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const setColonyTons = (tons) => {
    colonyState.tons = tons
    document.dispatchEvent(new CustomEvent("stateChanged"))
}

export const purchaseMineral = () => {
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
