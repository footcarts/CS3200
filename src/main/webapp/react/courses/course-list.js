import studentService from "../students/student-service";

const {Link, useHistory} = window.ReactRouterDOM;
import courseService, {findAllCourses} from "./course-service"
const { useState, useEffect } = React;


const CourseList = () => {
  const [courses, setCourses] = useState([])
  const history = useHistory()

  useEffect(() => {
    findAllCourses()
  }, [])
  const findAllCourses = () =>
      courseService.findAllCourses()
      .then(courses => {
        setCourses(courses)})


  return(
      <div>
        <h2>Courses</h2>
        <button onClick={() => history.push("/courses/new")}>
          Add Course
        </button>

        <ul>
          {
            courses.map(course =>
                <li key={course.id}>
                  <Link to={`/courses/${course.id}`}>
                    {course.title},
                    {course.code},
                    {course.sections.length}
                  </Link>
                </li>)
          }
        </ul>
      </div>
  )

}

export default CourseList;