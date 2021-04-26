package com.example.springtemplate.daos;

import com.example.springtemplate.models.Course;
import com.example.springtemplate.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class CourseOrmDao {

  @Autowired
  CourseRepository courseRepository;

  //works
  @PostMapping("/api/courses")
  public Course createCourse(@RequestBody Course course) {
    return courseRepository.save(course);
  }

  //works
  @GetMapping("/api/courses")
  public List<Course> findAllCourses() {
    return courseRepository.findAllCourses();
  }

  //works
  @GetMapping("/api/courses/{courseId}")
  public Course findCourseById(
      @PathVariable("courseId") Integer id) {
    return courseRepository.findCourseById(id);
  }

  //works
  @PutMapping("/api/courses/{courseId}")
  public Course updateCourse(
      @PathVariable("courseId") Integer id,
      @RequestBody() Course newCourse) {
    Course course = this.findCourseById(id);
    course.setTitle(newCourse.getTitle());
    course.setCode(newCourse.getCode());
    course.setDescription(newCourse.getDescription());
    return courseRepository.save(course);
  }

  //works
  @DeleteMapping("/api/courses/{courseId}")
  public void deleteCourse(
      @PathVariable("courseId") Integer id) {
    courseRepository.deleteById(id);
  }
}