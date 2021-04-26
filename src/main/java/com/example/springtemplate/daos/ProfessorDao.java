package com.example.springtemplate.daos;

import com.example.springtemplate.models.Professor;
import com.example.springtemplate.models.Section;
import com.example.springtemplate.repositories.ProfessorRepository;
import com.example.springtemplate.repositories.SectionRepository;
import com.fasterxml.jackson.databind.JsonNode;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ProfessorDao {

    @Autowired
    ProfessorRepository professorRepository;

    @Autowired
    SectionRepository sectionRepository;

    //works
    @PostMapping("/api/professors")
    public Professor createProfessor(@RequestBody JsonNode node) throws ParseException {
        Professor professor = new Professor();
        DateFormat df = new SimpleDateFormat("MM/dd/yyyy");
        professor.setDateOfBirth(df.parse(node.get("dateOfBirth").asText()));
        professor.setEmail(node.get("email").asText());
        professor.setFirstName(node.get("firstName").asText());
        professor.setLastName(node.get("lastName").asText());
        professor.setPassword(node.get("password").asText());
        professor.setUsername(node.get("username").asText());
        return professorRepository.save(professor);
    }

    //works
    @GetMapping("/api/professors")
    public List<Professor> findAllProfessors() {
        return professorRepository.findAllProfessors();
    }

    //works
    @GetMapping("/api/professors/{professorId}")
    public Professor findProfessorById(
            @PathVariable("professorId") Integer id) {
        return professorRepository.findProfessorById(id);
    }

    //works
    @PutMapping("/api/professors/{professorId}")
    public Professor updateProfessor(
            @PathVariable("professorId") Integer id,
            @RequestBody JsonNode node) throws ParseException {
        Professor professor = professorRepository.findProfessorById(id);
        DateFormat df = new SimpleDateFormat("MM/dd/yyyy");
        professor.setDateOfBirth(df.parse(node.get("dateOfBirth").asText()));
        professor.setEmail(node.get("email").asText());
        professor.setFirstName(node.get("firstName").asText());
        professor.setLastName(node.get("lastName").asText());
        if (node.get("password") != null){
            professor.setPassword(node.get("password").asText());
        }
        professor.setUsername(node.get("username").asText());
        return professorRepository.save(professor);
    }

    //works
    @PostMapping("/api/professors/{profId}/sections/add/{sectionId}")
    public Professor addSectionToProf(
        @PathVariable("profId") Integer pid,
        @PathVariable("sectionId") Integer sid) {
        Section s = sectionRepository.findSectionById(sid);
        Professor prof = professorRepository.findProfessorById(pid);
        List<Section> sectionList = prof.getSections();
        s.setProfessor(prof);
        sectionList.add(s);
        sectionRepository.save(s);
        prof.setSections(sectionList);
        return professorRepository.save(prof);
    }

    //works
    @DeleteMapping("/api/professors/{professorId}")
    public void deleteProfessor(
            @PathVariable("professorId") Integer id) {
        professorRepository.deleteById(id);
    }
}