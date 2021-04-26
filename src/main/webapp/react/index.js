import StudentList from "./students/student-list";
import ApplicationList from "./applications/application-list";
import CourseList from "./courses/course-list";
import ProfessorList from "./professors/professor-list";
import SectionList from "./sections/section-list";
import HomePage from "./home";
import ApplicationEditor from "./applications/application-editor";
import CourseEditor from "./courses/course-editor";
import ProfessorEditor from "./professors/professor-editor";
import StudentEditor from "./students/student-editor";
import SectionEditor from "./sections/section-editor";

const {HashRouter, Route} = window.ReactRouterDOM; 
const App = () => {
    return (
        <div className="container-fluid">
            <HashRouter>
                <Route path={["/"]} exact={true}>
                  <HomePage/>
                </Route>
                <Route path={["/applications"]} exact={true}>
                    <ApplicationList/>
                </Route>
                <Route path={["/professors"]} exact={true}>
                  <ProfessorList/>
                </Route>
                <Route path="/professors/:id" exact={true}>
                    <ProfessorEditor/>
                </Route>
                <Route path={["/courses"]} exact={true}>
                  <CourseList/>
                </Route>
                <Route path={["/students"]} exact={true}>
                    <StudentList/>
                </Route>
                <Route path={["/sections"]} exact={true}>
                  <SectionList/>
                </Route>
                <Route path="/students/:id" exact={true}>
                    <StudentEditor/>
                </Route>
                <Route path="/applications/:id" exact={true}>
                    <ApplicationEditor/>
                </Route>
                <Route path="/sections/:id" exact={true}>
                    <SectionEditor/>
                </Route>
                <Route path="/courses/:id" exact={true}>
                    <CourseEditor/>
                </Route>
            </HashRouter>
        </div>
    );
}
/*
<Route path={["/courses"]} exact={true}>
                    <CourseList/>
                </Route>
                <Route path={["/professors"]} exact={true}>
                    <ProfessorList/>
                </Route>
                <Route path={["/sections"]} exact={true}>
                    <SectionList/>
                </Route>
 */
export default App;
