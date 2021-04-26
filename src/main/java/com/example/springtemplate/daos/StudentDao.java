package com.example.springtemplate.daos;

import com.example.springtemplate.models.Application;
import com.example.springtemplate.models.Course;
import com.example.springtemplate.models.Professor;
import com.example.springtemplate.models.Student;
import com.example.springtemplate.repositories.ApplicationRepository;
import com.example.springtemplate.repositories.CourseRepository;
import com.example.springtemplate.repositories.StudentRepository;
import com.fasterxml.jackson.databind.JsonNode;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class StudentDao {
    @Autowired
    StudentRepository studentRepository;

    @Autowired
    ApplicationRepository applicationRepository;

    @Autowired
    CourseRepository courseRepository;


    @PostMapping("/api/students")
    public Student createStudent(@RequestBody JsonNode node) throws ParseException {
        Student student = new Student();
        DateFormat df = new SimpleDateFormat("MM/dd/yyyy");
        student.setDateOfBirth(df.parse(node.get("dateOfBirth").asText()));
        student.setEmail(node.get("email").asText());
        student.setFirstName(node.get("firstName").asText());
        student.setLastName(node.get("lastName").asText());
        student.setPassword(node.get("password").asText());
        student.setUsername(node.get("username").asText());
        return studentRepository.save(student);
    }

    //works
    @PostMapping("/api/students/{studentId}/applications")
    public Student createApplication(
        @PathVariable("studentId") Integer sid,
        @RequestBody JsonNode json) {
        Student s = studentRepository.findStudentById(sid);
        Course c = courseRepository.findCourseById(json.get("course").asInt());
        Application app = new Application(
            json.get("semester").asText(),
            json.get("url").asText(),
            s,c);
        List<Application> appList = s.getApplications();
        applicationRepository.save(app);
        appList.add(app);
        s.setApplications(appList);
        return studentRepository.save(s);
    }
    
    //works
    @GetMapping("/api/students")
    public List<Student> findAllStudents() {
        return studentRepository.findAllStudents();
    }

    //works
    @GetMapping("/api/students/{studentId}")
    public Student findStudentById(
            @PathVariable("studentId") Integer id) {
        return studentRepository.findStudentById(id);
    }

    //works
    @GetMapping("/api/students/{studentId}/applications")
    public List<Application> getApplications(
        @PathVariable("studentId") Integer id) {
        return studentRepository.findStudentById(id).getApplications();
    }
    
    //works
    @PutMapping("/api/students/{studentId}")
    public Student updateStudent(
            @PathVariable("studentId") Integer id,
        @RequestBody JsonNode node) throws ParseException {
        Student student = studentRepository.findStudentById(id);
        DateFormat df = new SimpleDateFormat("MM/dd/yyyy");
        student.setDateOfBirth(df.parse(node.get("dateOfBirth").asText()));
        student.setEmail(node.get("email").asText());
        student.setFirstName(node.get("firstName").asText());
        student.setLastName(node.get("lastName").asText());
        if (node.get("password") != null) {
            student.setPassword(node.get("password").asText());
        }
        student.setUsername(node.get("username").asText());
        return studentRepository.save(student);
    }

    
    //works
    @DeleteMapping("/api/students/{studentId}")
    public void deleteStudent(
            @PathVariable("studentId") Integer id) {
        studentRepository.deleteById(id);
    }
}