// TODO: declare URL where server listens for HTTP requests
const APP_URL = "http://localhost:8080/api/applications"
const STUDENTS_URL = "http://localhost:8080/api/students"

// TODO: retrieve all Applications from the server
export const findAllApplications = () => {
  return fetch(APP_URL).then(response => response.json())
}

// come back here
// TODO: create a new Application com
export const createApplication = (Application, student_id) => {
  return fetch(`${STUDENTS_URL}/${student_id}/applications`, {
    method: "POST",
    body: JSON.stringify(Application),
    headers: {'content-type': 'application/json'}
  })
  .then(response => response.json())
}

// TODO: retrieve a single Application by their ID
export const findApplicationById = (id) => {
  return fetch(`${APP_URL}/${id}`)
  .then(response => response.json())
}

// TODO: delete a Application by their ID
export const deleteApplication = (id) => {
  return fetch(`${APP_URL}/${id}`, {method: "DELETE"})
}

// TODO: update a Application by their ID
export const updateApplication = (id, Application) => {
  return fetch(`${APP_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(Application),
    headers: {'content-type': 'application/json'}
  })
  .then(response => response.json())
}

// TODO: export all functions as the API to this service
export default {
  createApplication,
  findAllApplications,
  findApplicationById,
  deleteApplication,
  updateApplication
}
