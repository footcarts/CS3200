import studentService from "../students/student-service";

const {Link,useHistory} = window.ReactRouterDOM;
import sectionService, {findAllSections} from "./section-service"
const { useState, useEffect } = React;


const SectionList = () => {
  const [sections, setSections] = useState([])
  const history = useHistory()

  useEffect(() => {
    findAllSections()
  }, [])
  const findAllSections = () =>
      sectionService.findAllSections()
      .then(sections => {
        setSections(sections)})


  return(
      <div>
        <h2>Sections</h2>
        <button onClick={() => history.push("/sections/new")}>
          Add Section
        </button>

        <ul>
          {
            sections.map(section =>
                <li key={section.id}>
                  <Link to={`/sections/${section.id}`}>
                    {section.course.code},
                    {section.semester},
                    {section.professor.lastName}
                  </Link>
                </li>)
          }
        </ul>
      </div>
  )

}

export default SectionList;