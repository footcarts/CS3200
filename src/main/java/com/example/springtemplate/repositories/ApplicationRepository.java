
package com.example.springtemplate.repositories;

import com.example.springtemplate.models.Application;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ApplicationRepository
    extends CrudRepository<Application, Integer>{

    @Query(value = "SELECT * FROM applications WHERE id=:applicationId", nativeQuery = true)
    Application findApplicationById(@Param("applicationId") Integer id);
    
    @Query(value = "SELECT * FROM applications", nativeQuery = true)
    List<Application> findAllApplications();
  }

