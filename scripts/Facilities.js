import { setFacilityId } from "./TransientState.js"


export const Facilities = async () => {
  const response = await fetch("http://localhost:8088/miningFacilities")
  const facilities = await response.json()

  let html = `
  <section class="dropdown-container">
    <label for="choose-facility">Choose a facility</label>
    <select id="choose-facility">
      <option value="0">Choose</option>
  `

  html += facilities
    .map(facility => `
      <option value="${facility.id}">${facility.name}</option>
    `)
    .join("")

  html += `
    </select>
  </section>
  `

  return html
}


document.addEventListener("change", eventHandler)

async function eventHandler(e) {
  if (e.target.id === "choose-facility") {
    const chosenId = parseInt(e.target.value, 10)

    
    setFacilityId(chosenId)

    
    document.dispatchEvent(new CustomEvent("stateChanged"))
  }
}
