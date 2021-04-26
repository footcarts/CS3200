import studentService from "./student-service"

const {useState, useEffect} = React;
const {useParams, useHistory, Link} = window.ReactRouterDOM;

const StudentEditor = () => {
  const {id} = useParams()
  const [student, setStudent] = useState({})
  const history = useHistory()

  useEffect(() => {
    if (id !== "new") {
      findStudentById(id)
    }
  }, []);
  const updateStudent = (id, newStudent) =>
      studentService.updateStudent(id, newStudent)
      .then(() => history.push('/students'))

  const createStudent = (student) =>
      studentService.createStudent(student)
      .then(() => history.push('/students'))

  const findStudentById = (id) =>
      studentService.findStudentById(id)
      .then(student => {
        let dob = student.dateOfBirth.slice(0, 10).split('-')
        student.dateOfBirth = `${dob[1]}/${dob[2]}/${dob[0]}`;
        if (student.applications == null) {
          student.applications = []
        }
        setStudent(student)
      })
  const deleteStudent = (id) =>
      studentService.deleteStudent(id)
      .then(() => history.push('/students'))
  const createButton = () => {
    if (id == "new") {
      return (<div>
        <button
            className="btn btn-warning"
            onClick={() => {
              history.push('/students')
            }}>
          Cancel
        </button>
        <button className="btn btn-success"
                onClick={() => createStudent(
                    student)}>Create
        </button>
      </div>)
    } else {
      return (<div>
        <button
            className="btn btn-warning"
            onClick={() => {
              history.push('/students')
            }}>
          Cancel
        </button>
        <button
            className="btn btn-danger"
            onClick={() => deleteStudent(student.id)}>
          Delete
        </button>

        <button className="btn btn-primary" onClick={() =>
            updateStudent(student.id, student)}>Save
        </button>
      </div>)
    }
  }

  if (id !== "new" && !student.username) {
    // not loaded
    return (
        <div>Loading...</div>
    )
  }
  return (
      <div>
        <h2>Student Editor</h2>

        <label>First Name</label>
        <input onChange={(e) =>
            setStudent(student =>
                ({...student, firstName: e.target.value}))}
               value={student.firstName}/><br/>
        <label>Last Name</label>
        <input onChange={(e) =>
            setStudent(student =>
                ({...student, lastName: e.target.value}))}
               value={student.lastName}/><br/>
        <label>Username</label>
        <input onChange={(e) =>
            setStudent(student =>
                ({...student, username: e.target.value}))}
               value={student.username}/><br/>
        <label>Password</label>
        <input onChange={(e) =>
            setStudent(student =>
                ({...student, password: e.target.value}))}
               value={student.password}/><br/>
        <label>Email</label>
        <input input onChange={(e) =>
            setStudent(student =>
                ({...student, email: e.target.value}))}
               value={student.email}/><br/>
        <label>Date of Birth (MM/DD/YYYY)</label>
        <input input onChange={(e) =>
            setStudent(student =>
                ({...student, dateOfBirth: e.target.value}))}
               value={student.dateOfBirth}/><br/>
        <br/>
        {createButton()}
        <div>
          <h2>Applications</h2>
          <ul>{
            student.applications.map(app =>
                <li key={app.id}>
                  <Link to={`/applications/${app.id}`}>
                    {app.course.title},
                    {app.status},
                    {app.semester}
                  </Link>
                </li>)
          }
          </ul>
        </div>
      </div>
  )
}

export default StudentEditor