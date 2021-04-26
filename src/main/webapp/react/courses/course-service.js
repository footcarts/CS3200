// TODO: declare URL where server listens for HTTP requests
const COURSE_URL = "http://localhost:8080/api/courses"


// TODO: retrieve all Courses from the server
export const findAllCourses = () => {
  return fetch(COURSE_URL).then(response => response.json())
}

// TODO: retrieve a single Course by their ID
export const findCourseById = (id) => {
  return fetch(`${COURSE_URL}/${id}`)
  .then(response => response.json())
}

// TODO: delete a Course by their ID
export const deleteCourse = (id) => {
  return fetch(`${COURSE_URL}/${id}`,{method: "DELETE"})
}

// TODO: create a new Course
export const createCourse = (Course) => {
  return fetch(`${COURSE_URL}`,{
    method: "POST",
    body: JSON.stringify(Course),
    headers: {'content-type': 'application/json'}
  })
  .then(response => response.json())
}

// TODO: update a Course by their ID
export const updateCourse = (id, Course) => {
  return fetch(`${COURSE_URL}/${id}`,{
    method: "PUT",
    body: JSON.stringify(Course),
    headers: {'content-type': 'application/json'}
  })
  .then(response => response.json())
}

// TODO: export all functions as the API to this service
export default {
  createCourse,
  findAllCourses,
  findCourseById,
  deleteCourse,
  updateCourse
}
