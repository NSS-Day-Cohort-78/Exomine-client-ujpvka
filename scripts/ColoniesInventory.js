// import governor id from transient state
import { getColonyTransientState } from "./TransientState.js"

export const ColoniesInventory = async () => {
    // this will give me the the colonyInventory so i can get the colony ID
    const transientState = getColonyTransientState()
    const id = transientState.colonyId
    const response = await fetch(
        "http://localhost:8088/colonyInventory?_expand=colony&_expand=mineral"
    )
    const coloniesData = await response.json()

    let html = `
    <section class='colony-inventory'>
    `

    if (id === 0) {
        html += `<h2>Colony Minerals</h2>`
    } else {
        const response2 = await fetch(`http://localhost:8088/colonies/${id}`)
        const colony = await response2.json()
        const filteredArr = coloniesData.filter(
            // we will get the colony id from transient state as id
            (targetObj) => targetObj.colony.id === id
        )

        html += `<h2>${colony.name}</h2>`

        const colonyData = filteredArr
            .map((colony) => {
                const tons =
                    colony.tons === 0
                        ? ""
                        : `<p>${colony.tons} tons of ${colony.mineral.name}</p>`
                return tons
            })
            .join("")

        html += colonyData
    }

    // loop colonies to get match governor id and get colony id

    html += `
    </section>
    `

    return html
}
