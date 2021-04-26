package com.example.springtemplate.repositories;

import com.example.springtemplate.models.Course;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends CrudRepository<Course, Integer> {

    @Query(value = "SELECT * FROM courses WHERE id=:courseId", nativeQuery = true)
    Course findCourseById(@Param("courseId") Integer id);
    
    @Query(value = "SELECT * FROM courses",
      nativeQuery = true)
    List<Course> findAllCourses();
}
