export const Governors = async () => {
    // dummy api
    const response = await fetch("http://localhost:8088/governors")
    const governors = await response.json()

    let html = `
    <section class='dropdown-container'>
        <label for='choose-governor'>Choose a governor</label>
        <select id='choose-governor'>
    `
    html += governors
        .map((governor) => {
            return `
        <option value='${governor.id}'>${governor.name}</option>
        `
        })
        .join("")

    html += `
        </select>
    </section>`

    return html
}
