import { setColonyId, getColonyTransientState } from "./TransientState.js"

export const Governors = async () => {
    const response = await fetch(
        "http://localhost:8088/governors?_embed=colonies"
    )
    const governors = await response.json()

    const transient = getColonyTransientState()

    document.addEventListener("change", eventHandler)

    let html = `
    <section class='dropdown-container'>
      <label for='choose-governor'>Choose a governor</label>
      <select id='choose-governor'>
        <option value='0'>Choose</option>
  `

    html += governors
        .map((governor) => {
            if (governor.active) {
                return transient.colonyId === governor.colonies[0].governorId
                    ? `<option selected value='${governor.id}'>${governor.name}</option>`
                    : `<option value='${governor.id}'>${governor.name}</option>`
            }
        })
        .join("")

    html += `
      </select>
    </section>
  `

    return html
}

const eventHandler = async (e) => {
    if (e.target.id === "choose-governor") {
        const response = await fetch("http://localhost:8088/colonies")
        const colonies = await response.json()

        const colony = colonies.find(
            (col) => col.governorId === parseInt(e.target.value)
        )

        colony ? setColonyId(colony.id) : setColonyId(0)
    }
}
