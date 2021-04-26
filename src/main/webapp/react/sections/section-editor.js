import sectionService from "./section-service"
import applicationService from "../applications/application-service";
const {useState, useEffect} = React;
const {useParams,useHistory, Link} = window.ReactRouterDOM;

const SectionEditor = () => {
        const {id} = useParams()
        const [section, setSection] = useState({})
        const history = useHistory()
        useEffect(() => {
                if(id !== "new") {
                        findSectionById(id)
                }
        }, []);
        const updateSection = (id, newSection) =>
            sectionService.updateSection(id, newSection)
            .then(() => history.push('/sections'))
        const createSection = (section) =>
            sectionService.createSection(section)
            .then(() => history.push('/sections'))
        const findSectionById = (id) => 
            sectionService.findSectionById(id)
            .then(section => {
              if (section.professor){
                section.professor = section.professor.id
              }
              section.course = section.course.id
              setSection(section)})

        const deleteSection = (id) =>
            sectionService.deleteSection(id)
            .then(() => history.push('/sections'))

  const createButton = () => {
    if (id == "new") {
      return (<div><button
          className="btn btn-warning"
          onClick={() => {
            history.push('/sections')}}>
        Cancel
      </button>
        <button className="btn btn-success"
                onClick={() => createSection(
                    section)}>Create</button></div>)
    }
    else{
      return (<div>
        <button
            className="btn btn-warning"
            onClick={() => {
              history.push('/sections')}}>
          Cancel
        </button>
        <button
            className="btn btn-danger"
            onClick={() => deleteSection(section.id)}>
          Delete
        </button>

        <button className="btn btn-primary"onClick={() =>
            updateSection(section.id, section)}>Save</button>
      </div>)
    }
  }
  return (
        <div>
            <h2>Section Editor</h2>

            <label>Professor Statement</label>
                <input onChange={(e) =>
                    setProfessor(section =>
                        ({...section, profStatement: e.target.value}))}
                       value={section.profStatement}/><br/>
            <label>Semester</label>
                <input onChange={(e) =>
                    setSemester(section =>
                        ({...section, semester: e.target.value}))}
                       value={section.semester}/><br/>
          <label>Course</label>
          <input onChange={(e) =>
              setCourse(section =>
                  ({...section, course: e.target.value}))}
                 value={section.course}/>
          <Link to={`/courses/${section.course}`}>
            View Course
          </Link><br/>
          <label>Professor</label>
          <input onChange={(e) =>
              setProfessor(section =>
                  ({...section, professor: e.target.value}))}
                 value={section.professor}/>
                 <Link to={`/professors/${section.professor}`}>
          View Professor
        </Link><br/>
            <br/>
          {createButton()}
        </div>
    )
}

export default SectionEditor