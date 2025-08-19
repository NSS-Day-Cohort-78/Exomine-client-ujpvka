// import governor id from transient state
import { getColonyTransientState } from "./TransientState.js"

export const ColoniesInventory = async () => {
    // this will give me the the colonyInventory so i can get the colony ID
    const transientState = getColonyTransientState()

    let html = `
    <section class='colony-inventory'>
    `

    const list =
        transientState.colonyId <= 0 ? `<h2>Colony Minerals</h2>` : "<h2></h2>"

    html += `
    </section>
    `
}
