// TODO: declare URL where server listens for HTTP requests
const SECTION_URL = "http://localhost:8080/api/sections"

// TODO: retrieve all Sections from the server
export const findAllSections = () => {
  return fetch(SECTION_URL).then(response => response.json())
}

// TODO: retrieve a single Section by their ID
export const findSectionById = (id) => {
  return fetch(`${SECTION_URL}/${id}`)
  .then(response => response.json())
}

// TODO: delete a Section by their ID
export const deleteSection = (id) => {
  return fetch(`${SECTION_URL}/${id}`, {method: "DELETE"})
}

// TODO: create a new Section
export const createSection = (Section) => {
  return fetch(`${SECTION_URL}`, {
    method: "POST",
    body: JSON.stringify(Section),
    headers: {'content-type': 'application/json'}
  })
  .then(response => response.json())
}

// TODO: update a Section by their ID
export const updateSection = (id, Section) => {
  return fetch(`${SECTION_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(Section),
    headers: {'content-type': 'application/json'}
  })
  .then(response => response.json())
}

// TODO: export all functions as the API to this service
export default {
  createSection,
  findAllSections,
  findSectionById,
  deleteSection,
  updateSection
}
