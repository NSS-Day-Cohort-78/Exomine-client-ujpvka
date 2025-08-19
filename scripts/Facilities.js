export const Facilities = async () => {
  const response = await fetch("http://localhost:8088/miningFacilities");
  const facilities = await response.json();

  let html = `
  <section class='dropdown-container'>
    <label for='choose-facility'>Choose a facility</label>
    <select id='choose-facility'>
  `;

  html += facilities
    .map((facility) => {
      return `
      <option value='${facility.id}'>${facility.name}</option>
      `;
    })
    .join("");

  html += `
    </select>
  </section>`;

  return html;
};