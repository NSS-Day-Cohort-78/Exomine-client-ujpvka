// scripts/Facilities.js
import { setFacilityId, getFacilityTransientState, getColonyTransientState } from "./TransientState.js"

export const Facilities = async () => {
  // API'den facilities çek
  const response = await fetch("http://localhost:8088/miningFacilities")
  const facilities = await response.json()

 
  const transientFacility = getFacilityTransientState()
  const transientColony   = getColonyTransientState()

  
  const disabledAttr = transientColony.colonyId === 0 ? "disabled" : ""

  let html = `
  <section class='dropdown-container'>
    <label for='choose-facility'>Choose a facility</label>
    <select id='choose-facility' ${disabledAttr}>
      <option value='0' ${transientFacility.miningFacilityId === 0 ? "selected" : ""} ${disabledAttr}>Choose</option>
  `

  
  html += facilities.map(facility => {
      const selected = transientFacility.miningFacilityId === facility.id ? "selected" : ""
      const optDisabled = facility.active ? "" : "disabled"
      return `
        <option value='${facility.id}' ${selected} ${optDisabled}>${facility.name}</option>
      `
    })
    .join("")

  html += `
    </select>
  </section>
  `

  return html
}

// governors'taki gibi basit change handler
document.addEventListener("change", (e) => {
  if (e.target.id === "choose-facility") {
    const id = parseInt(e.target.value, 10)
    setFacilityId(id)                         
    
  }
})