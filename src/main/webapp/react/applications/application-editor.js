import applicationService from "./application-service"

const {useState, useEffect} = React;
const {useParams, useHistory, Link} = window.ReactRouterDOM;

const ApplicationEditor = () => {
  const {id} = useParams()
  const [application, setApplication] = useState({})
  const history = useHistory()
  useEffect(() => {
    if (id !== "new") {
      findApplicationById(id)
    }
  }, []);
  const updateApplication = (id, newApplication) =>
      applicationService.updateApplication(id, newApplication)
      .then(() => history.push('/applications'))

  const createApplication = (application) =>
      applicationService.createApplication(application, application.student)
      .then((application) => findApplicationById(application.id))

  const findApplicationById = (id) =>
      applicationService.findApplicationById(id)
      .then(application => {
        application.student = application.student.id
        application.course = application.course.id
        setApplication(application)
      })

  const deleteApplication = (id) =>
      applicationService.deleteApplication(id)
      .then(() => history.push('/applications'))

  if (id !== "new" && !application.status) {
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
              history.push('/applications')
            }}>
          Cancel
        </button>
        <button className="btn btn-success"
                onClick={() => createApplication(
                    application)}>Create
        </button>
      </div>)
    } else {
      return (<div>
        <button
            className="btn btn-warning"
            onClick={() => {
              history.push('/applications')
            }}>
          Cancel
        </button>
        <button
            className="btn btn-danger"
            onClick={() => deleteApplication(application.id)}>
          Delete
        </button>

        <button className="btn btn-primary" onClick={() =>
            updateApplication(application.id, application)}>Save
        </button>
      </div>)
    }
  }
  return (
      <div>
        <h2>Application Editor</h2>

        <label>Semester</label>
        <input onChange={(e) =>
            setApplication(application =>
                ({...application, semester: e.target.value}))}
               value={application.semester}/><br/><br/>
        <label>Resume URL</label>
        <input input onChange={(e) =>
            setApplication(application =>
                ({...application, url: e.target.value}))}
               value={application.url}/><br/><br/>
        <label>Status</label>
        <input input onChange={(e) =>
            setApplication(application =>
                ({...application, status: e.target.value}))}
               value={application.status}/><br/><br/>

        <label>Student ID</label>
        <input input onChange={(e) =>
            setApplication(application =>
                ({...application, student: e.target.value}))}
               value={application.student}/><Link
          to={`/students/${application.student}`}>
        View Student
      </Link><br/><br/>
        <label>Course ID</label>
        <input input onChange={(e) =>
            setApplication(application =>
                ({...application, course: e.target.value}))}
               value={application.course}/>
        <Link to={`/courses/${application.course}`}>
          View Course
        </Link><br/><br/>
        <br/>
        {createButton()}
      </div>
  )
}

export default ApplicationEditor