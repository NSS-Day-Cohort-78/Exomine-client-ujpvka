// import governor id from transient state
import { getColonyTransientState } from "./TransientState.js"

export const ColoniesInventory = async () => {
    // this will give me the the colonyInventory so i can get the colony ID
    const transientState = getColonyTransientState()
    const id = transientState.colonyId

    const list = await getColonyList(id)

    let html = `
    <section class='colony-inventory'>
    `

    html += `
    ${list}
    </section>
    `

    return html
}

const getColonyList = async (id) => {
    const response = await fetch(
        "http://localhost:8088/colonyInventory?_expand=colony&_expand=mineral"
    )
    const coloniesData = await response.json()

    if (id === 0) {
        return `<h2>Colony Minerals</h2>`
    } else {
        const filteredArr = coloniesData.filter(
            // we will get the colony id from transient state as id
            (colony) => colony.colony.id === id
        )
        const name = `<h2>${filteredArr[0].colony.name}</h2>`

        const colonyData = filteredArr
            .map((colony) => {
                const tons =
                    colony.tons === 0
                        ? ""
                        : `<p>${colony.tons} tons of ${colony.mineral.name}</p>`
                return tons
            })
            .join("")
        debugger
    }
}
