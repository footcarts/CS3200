package com.example.springtemplate.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;

@Entity
@Table(name="sections")
public class Section {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String profStatement;

    private String semester;

    @ManyToOne
    @JsonIgnoreProperties({"sections", "description"})
    private Course course;

    @ManyToOne
    @JsonIgnoreProperties({"sections","dateOfBirth","username"})
    private Professor professor;

    public Section() {
    }

    public Section(String semester) {
        this();
        this.semester = semester;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProfStatement() {
        return profStatement;
    }

    public void setProfStatement(String profStatement) {
        this.profStatement = profStatement;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Professor getProfessor() {
        return professor;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }
    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }
}
