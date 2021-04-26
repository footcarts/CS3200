// TODO: declare URL where server listens for HTTP requests
const STUDENTS_URL = "http://localhost:8080/api/students"




// TODO: retrieve all Students from the server
export const findAllStudents = () => {
  return fetch(STUDENTS_URL).then(response => response.json())
}

// TODO: retrieve a single Student by their ID
export const findStudentById = (id) => {
  return fetch(`${STUDENTS_URL}/${id}`)
  .then(response => response.json())
}

// TODO: delete a Student by their ID
export const deleteStudent = (id) => {
  return fetch(`${STUDENTS_URL}/${id}`,{method: "DELETE"})
}

// TODO: create a new Student
export const createStudent = (Student) => {
  return fetch(`${STUDENTS_URL}`, {
    method: "POST",
    body: JSON.stringify(Student),
    headers: {'content-type': 'application/json'}
  })
  .then(response => response.json())
}

// TODO: update a Student by their ID
export const updateStudent = (id, Student) => {
  return fetch(`${STUDENTS_URL}/${id}`,{
    method: "PUT",
    body: JSON.stringify(Student),
    headers: {'content-type': 'application/json'}
  })
  .then(response => response.json())
}

// TODO: export all functions as the API to this service
export default {
  findAllStudents,
  findStudentById,
  deleteStudent,
  createStudent,
  updateStudent
}
