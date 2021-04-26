// TODO: declare URL where server listens for HTTP requests
const PROF_URL = "http://localhost:8080/api/professors"


// TODO: retrieve all Professors from the server
export const findAllProfessors = () => {
  return fetch(PROF_URL).then(response => response.json())
}

// TODO: retrieve a single Professor by their ID
export const findProfessorById = (id) => {
  return fetch(`${PROF_URL}/${id}`)
  .then(response => response.json())
}

// TODO: delete a Professor by their ID
export const deleteProfessor = (id) => {
  return fetch(`${PROF_URL}/${id}`,{method: "DELETE"})
}

// TODO: create a new Professor
export const createProfessor = (Professor) => {
  return fetch(`${PROF_URL}`,{
    method: "POST",
    body: JSON.stringify(Professor),
    headers: {'content-type': 'application/json'}
  })
  .then(response => response.json())
}

// TODO: update a Professor by their ID
export const updateProfessor = (id, Professor) => {
  return fetch(`${PROF_URL}/${id}`,{
    method: "PUT",
    body: JSON.stringify(Professor),
    headers: {'content-type': 'application/json'}
  })
  .then(response => response.json())
}

// TODO: export all functions as the API to this service
export default {
  createProfessor,
  findAllProfessors,
  findProfessorById,
  deleteProfessor,
  updateProfessor
}
