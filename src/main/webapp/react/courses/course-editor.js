import courseService from "./course-service"
import applicationService from "../applications/application-service"

const {useState, useEffect} = React;
const {useParams, useHistory, Link} = window.ReactRouterDOM;

const CourseEditor = () => {
  const {id} = useParams()
  const [course, setCourse] = useState({})


  const history = useHistory()
  useEffect(() => {
    if (id !== "new") {
      findCourseById(id)

    }
  }, []);
  const updateCourse = (id, newCourse) =>
      courseService.updateCourse(id, newCourse)
      .then(() => history.push('/courses'))
  const createCourse = (course) =>
      courseService.createCourse(course)
      .then(() => history.push('/courses'))
  const findCourseById = (id) =>
      courseService.findCourseById(id)
      .then(course => {
        applicationService.findAllApplications()
        .then(apps => {
          course.applications = apps.filter(app => app.course.id == course.id)
          setCourse(course)
        })
      })

  const deleteCourse = (id) =>
      courseService.deleteCourse(id)
      .then(() => history.push('/courses'))

  if (id !== "new" && !course.code) {
    // not loaded
    return (
        <div>Loading...</div>
    )
  }
  const createButton = () => {
    if (id == "new") {
      return (<div>
        <button
            className="btn btn-warning"
            onClick={() => {
              history.push('/courses')
            }}>
          Cancel
        </button>
        <button className="btn btn-success"
                onClick={() => createCourse(
                    course)}>Create
        </button>
      </div>)
    } else {
      return (<div>
        <button
            className="btn btn-warning"
            onClick={() => {
              history.push('/courses')
            }}>
          Cancel
        </button>
        <button
            className="btn btn-danger"
            onClick={() => deleteCourse(course.id)}>
          Delete
        </button>

        <button className="btn btn-primary" onClick={() =>
            updateCourse(course.id, course).then(
                () => history.push('/courses'))}>Save
        </button>
      </div>)
    }
  }
  return (
      <div>
        <h2>Course Editor</h2>

        <label>Course Title</label>
        <input onChange={(e) =>
            setCourse(course =>
                ({...course, title: e.target.value}))}
               value={course.title}/><br/>
        <label>Course Code</label>
        <input onChange={(e) =>
            setCourse(course =>
                ({...course, code: e.target.value}))}
               value={course.code}/><br/>
        <label>Description</label>
        <input onChange={(e) =>
            setCourse(course =>
                ({...course, description: e.target.value}))}
               value={course.description}/><br/>
        <br/>
        {createButton()}
        <div>
          <h2>Sections</h2>
          <ul>{
            course.sections.map(section =>
                <li key={section.id}>
                  <Link to={`/sections/${section.id}`}>
                    {section.semester},
                    {section.professor.lastName}
                  </Link>
                </li>)
          }
          </ul>
        </div>
        <div>
          <h2>Applications</h2>
          <ul>{
            course.applications.map(app =>
              <li key={app}>
                <Link to={`/applications/${app.id}`}>
                  {app.student.firstName},
                  {app.student.lastName},
                  {app.semester}
                </Link>
              </li>
            )
          }
          </ul>
        </div>

      </div>
  )
}

export default CourseEditor