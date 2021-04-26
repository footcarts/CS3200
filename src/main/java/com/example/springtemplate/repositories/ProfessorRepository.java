
package com.example.springtemplate.repositories;
import com.example.springtemplate.models.Professor;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ProfessorRepository
    extends CrudRepository<Professor, Integer>{

  @Query(value = "SELECT * FROM professors",
      nativeQuery = true)
  public List<Professor> findAllProfessors();

  @Query(value = "SELECT * FROM professors WHERE id=:professorId",
      nativeQuery = true)
  public Professor findProfessorById(@Param("professorId") Integer id);
}