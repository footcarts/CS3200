package com.example.springtemplate.daos;
import com.example.springtemplate.models.Application;
import com.example.springtemplate.models.Course;
import com.example.springtemplate.models.Student;
import com.example.springtemplate.repositories.ApplicationRepository;
import com.example.springtemplate.repositories.CourseRepository;
import com.example.springtemplate.repositories.StudentRepository;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ApplicationDao {
    @Autowired
    ApplicationRepository applicationRepository;

    @Autowired
    StudentRepository studentRepository;

    @Autowired
    CourseRepository courseRepository;

    //works
    @GetMapping("/api/applications")
    public List<Application> findAllApplications() {
        return applicationRepository.findAllApplications();
    }

    //works
    @GetMapping("/api/applications/{applicationId}")
    public Application findApplicationById(
        @PathVariable("applicationId") Integer id) {
        return applicationRepository.findApplicationById(id);
    }

    //works
    @PutMapping("/api/applications/{applicationId}")
    public Application updateApplication(
        @PathVariable("applicationId") Integer id,
        @RequestBody JsonNode json) {
        Application app = applicationRepository.findApplicationById(id);

        JsonNode courseId = json.get("course");
        JsonNode studentId = json.get("student");
        if (courseId != null) {
            Course c = courseRepository.findCourseById(courseId.asInt());
            app.setCourse(c);
        }
        if (studentId != null) {
            Student s = studentRepository.findStudentById(studentId.asInt());
            app.setStudent(s);
        }
        app.setSemester(json.get("semester").asText());
        app.setURL(json.get("url").asText());
        app.setStatus(json.get("status").asText());
        return applicationRepository.save(app);
    }

    //works
    @DeleteMapping("/api/applications/{applicationId}")
    public void deleteApplication(
        @PathVariable("applicationId") Integer id) {
        applicationRepository.deleteById(id);
    }
}