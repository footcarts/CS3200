package com.example.springtemplate.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.Date;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String semester;
    private String URL;
    private String status;

    @ManyToOne
    @JsonIgnoreProperties({"username", "password","dateOfBirth","applications"})
    private Student student;

    @ManyToOne
    @JsonIgnoreProperties({"sections", "description"})
    private Course course;

    public Application() {
    }

    public Application(String semester, String URL,
        Student student, Course course) {
        this();
        this.semester = semester;
        this.URL = URL;
        this.status = "Submitted";
        this.student = student;
        this.course = course;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getURL() {
        return URL;
    }

    public void setURL(String URL) {
        this.URL = URL;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }
}
