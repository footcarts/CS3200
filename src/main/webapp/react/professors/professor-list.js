import studentService from "../students/student-service";

const {Link, useHistory} = window.ReactRouterDOM;
import professorService, {findAllProfessors} from "./professor-service"

const {useState, useEffect} = React;

const ProfessorList = () => {
  const [professors, setProfessors] = useState([])
  const history = useHistory()

  useEffect(() => {
    findAllProfessors()
  }, [])
  const findAllProfessors = () =>
      professorService.findAllProfessors()
      .then(professors => {
        setProfessors(professors)
      })

  return (
      <div>
        <h2>Professors</h2>
        <button onClick={() => history.push("/professors/new")}>
          Add Professor
        </button>

        <ul>
          {
            professors.map(professor =>
                <li key={professor.id}>
                  <Link to={`/professors/${professor.id}`}>
                    {professor.firstName},
                    {professor.lastName},
                    {professor.username}
                  </Link>
                </li>)
          }
        </ul>
      </div>
  )

}

export default ProfessorList;