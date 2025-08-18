export const Governors = async () => {
	// dummy api
	const response = await fetch("https://jsonplaceholder.typicode.com/users")
	const governors = await response.json()

	let html = `
    <section>
    <p>Choose a governor</p>
    <select>
    `
	html += governors
		.map(governor => {
			return `
        <option>${governor.name}</option>
        `
		})
		.join("")

	html += `</select>
    </section>`

	return html
}
