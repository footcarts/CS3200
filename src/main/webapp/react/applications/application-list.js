import studentService from "../students/student-service";

const {Link,useHistory} = window.ReactRouterDOM;
import applicationService, {findAllApplications} from "./application-service"
const { useState, useEffect } = React;


const ApplicationList = () => {
  const [applications, setApplications] = useState([])
  const history = useHistory()

  useEffect(() => {
    findAllApplications()
  }, [])
  const findAllApplications = () =>
      applicationService.findAllApplications()
      .then(applications => {
        setApplications(applications)
      })

  return (
      <div>
        <h2>Applications</h2>
        <button onClick={() => history.push("/applications/new")}>
          Add Application
        </button>

        <ul>
          {
            applications.map(application =>
                <li key={application.id}>
                  <Link to={`/applications/${application.id}`}>
                    {application.status},
                    {application.student.firstName},
                    {application.course.code}
                  </Link>
                </li>)
          }
        </ul>
      </div>
  )

}

export default ApplicationList;