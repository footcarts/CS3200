const {Link, useHistory} = window.ReactRouterDOM;
import studentService from "./student-service"

const {useState, useEffect} = React;


const StudentList = () => {
  const [students, setStudents] = useState([])
  const history = useHistory()

  useEffect(() => {
    findAllStudents()
  }, [])
  const findAllStudents = () =>
      studentService.findAllStudents()
      .then(students => setStudents(students))


  return(
      <div>
        <h2>Students</h2>
        <button onClick={() => history.push("/students/new")}>
          Add Student
        </button>

        <ul>
          {
            students.map(student =>
                <li key={student.id}>
                  <Link to={`/students/${student.id}`}>

                  {student.firstName},
                  {student.lastName},
                  {student.username}
                  </Link>
                </li>)
          }
        </ul>
      </div>
  )

}

export default StudentList;