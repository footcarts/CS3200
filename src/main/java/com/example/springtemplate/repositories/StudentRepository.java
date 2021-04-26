package com.example.springtemplate.repositories;

import com.example.springtemplate.models.Student;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


public interface StudentRepository
    extends CrudRepository<Student, Integer> {

  @Query(value = "SELECT * FROM students",
      nativeQuery = true)
  public List<Student> findAllStudents();

  @Query(value = "SELECT * FROM students WHERE id=:studentId",
      nativeQuery = true)
  public Student findStudentById(@Param("studentId") Integer id);
}
