import professorService from "./professor-service"

const {useState, useEffect} = React;
const {useParams, useHistory, Link} = window.ReactRouterDOM;

const ProfessorEditor = () => {
  const {id} = useParams()
  const [professor, setProfessor] = useState({})
  const history = useHistory()
  useEffect(() => {
    if (id !== "new") {
      findProfessorById(id)
    }
  }, []);
  const updateProfessor = (id, newProfessor) =>
      professorService.updateProfessor(id, newProfessor)
      .then(() => history.push('/professors'))

  const createProfessor = (professor) =>
      professorService.createProfessor(professor)
      .then(() => history.push('/professors'))

  const findProfessorById = (id) =>
      professorService.findProfessorById(id)
      .then(professor => {
        let dob = professor.dateOfBirth.slice(0, 10).split('-')
        professor.dateOfBirth = `${dob[1]}/${dob[2]}/${dob[0]}`;
        if (professor.sections == null) {
          professor.sections = []
        }
        setProfessor(professor)
      })
  const deleteProfessor = (id) =>
      professorService.deleteProfessor(id)
      .then(() => history.push('/professors'))
  const createButton = () => {
    if (id == "new") {
      return (<div>
        <button
            className="btn btn-warning"
            onClick={() => {
              history.push('/professors')
            }}>
          Cancel
        </button>
        <button className="btn btn-success"
                onClick={() => createProfessor(
                    professor)}>Create
        </button>
      </div>)
    } else {
      return (<div>
        <button
            className="btn btn-warning"
            onClick={() => {
              history.push('/professors')
            }}>
          Cancel
        </button>
        <button
            className="btn btn-danger"
            onClick={() => deleteProfessor(professor.id)}>
          Delete
        </button>

        <button className="btn btn-primary" onClick={() =>
            updateProfessor(professor.id, professor).then(
                () => history.push('/professors'))}>Save
        </button>
      </div>)
    }
  }
  if (id !== "new" && !professor.username) {
    // not loaded
    return (
        <div>Loading...</div>
    )
  }

  return (
      <div>
        <h2>Professor Editor</h2>

        <label>First Name</label>
        <input onChange={(e) =>
            setProfessor(professor =>
                ({...professor, firstName: e.target.value}))}
               value={professor.firstName}/><br/><br/>
        <label>Last Name</label>
        <input onChange={(e) =>
            setProfessor(professor =>
                ({...professor, lastName: e.target.value}))}
               value={professor.lastName}/><br/><br/>
        <label>Username</label>
        <input onChange={(e) =>
            setProfessor(professor =>
                ({...professor, username: e.target.value}))}
               value={professor.username}/><br/><br/>
        <label>Password</label>
        <input onChange={(e) =>
            setProfessor(professor =>
                ({...professor, password: e.target.value}))}
               value={professor.password}/><br/><br/>
        <label>Email</label>
        <input input onChange={(e) =>
            setProfessor(professor =>
                ({...professor, email: e.target.value}))}
               value={professor.email}/><br/><br/>
        <label>Date of Birth (MM/DD/YYYY) </label>
        <input input onChange={(e) =>
            setProfessor(professor =>
                ({...professor, dateOfBirth: e.target.value}))}
               value={professor.dateOfBirth}/><br/>
        <br/>
        {createButton()}
        <div>
          <h2>Sections</h2>
          <ul>{

            professor.sections.map(section =>
                <li key={section.id}>
                  <Link to={`/sections/${section.id}`}>
                    {section.semester},
                    {section.course.title}
                  </Link>
                </li>)
          }
          </ul>
        </div>
      </div>
  )
}

export default ProfessorEditor