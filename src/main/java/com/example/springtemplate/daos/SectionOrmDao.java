package com.example.springtemplate.daos;

import com.example.springtemplate.models.Application;
import com.example.springtemplate.models.Course;
import com.example.springtemplate.models.Professor;
import com.example.springtemplate.models.Section;
import com.example.springtemplate.models.Student;
import com.example.springtemplate.repositories.CourseRepository;
import com.example.springtemplate.repositories.ProfessorRepository;
import com.example.springtemplate.repositories.SectionRepository;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class SectionOrmDao {

  @Autowired
  ProfessorRepository professorRepository;

  @Autowired
  SectionRepository sectionRepository;

  @Autowired
  CourseRepository courseRepository;


  //works
    /*
    A section has to be connected to a when created. needs to be appending to list
     */
  @PostMapping("/api/courses/{courseId}/sections")
  public Section createSectionForCourse(
      @PathVariable("courseId") Integer cid,
      @RequestBody Section section) {
    Course course = courseRepository.findCourseById(cid);
    section.setCourse(course);
    section = sectionRepository.save(section);
    return sectionRepository.save(section);
  }


  //works
  @GetMapping("/api/courses/{cid}/sections")
  public List<Section> findSectionsForCourse(
      @PathVariable("cid") Integer courseId) {
    Course course = courseRepository.findCourseById(courseId);
    return course.getSections();
  }

  //works
  @GetMapping("/api/sections")
  public List<Section> findAllSections() {
    return sectionRepository.findAllSections();
  }

  //works
  @GetMapping("/api/sections/{sectionId}")
  public Section findSectionById(
      @PathVariable("sectionId") Integer id) {
    return sectionRepository.findSectionById(id);
  }

  //works
  @PutMapping("/api/sections/{sectionId}")
  public Section updateSection(
      @PathVariable("sectionId") Integer id,
      @RequestBody JsonNode json) {
    Section section = sectionRepository.findSectionById(id);

    JsonNode courseId = json.get("course");
    if (courseId != null) {
      Course c = courseRepository.findCourseById(courseId.asInt());
      section.setCourse(c);
    }
    JsonNode profId = json.get("professor");
    if (profId != null) {
      Professor p = professorRepository.findProfessorById(profId.asInt());
      section.setProfessor(p);
    }
    section.setProfStatement(json.get("status").asText());
    section.setSemester(json.get("status").asText());
    return sectionRepository.save(section);
  }

  //works
  @DeleteMapping("/api/sections/{sectionId}")
  public void deleteSection(
      @PathVariable("sectionId") Integer id) {
    sectionRepository.deleteById(id);
  }
}