package com.example.springtemplate.repositories;

import com.example.springtemplate.models.Section;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface SectionRepository
        extends CrudRepository<Section, Integer> {
    @Query(value = "SELECT * FROM sections",
        nativeQuery = true)
    public List<Section> findAllSections();

    @Query(value = "SELECT * FROM sections WHERE id=:sectionId",
        nativeQuery = true)
    public Section findSectionById(@Param("sectionId") Integer id);
}

