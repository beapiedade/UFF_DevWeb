package com.beapiedade.controller;

import com.beapiedade.model.Professor;
import com.beapiedade.model.Turma;
import com.beapiedade.model.TurmaDTO;
import com.beapiedade.repository.ProfessorRepository;
import com.beapiedade.repository.TurmaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/turmas")
public class TurmaController {

    @Autowired
    private TurmaRepository turmaRepository;
    @Autowired
    private ProfessorRepository professorRepository;

    @PostMapping
    public ResponseEntity<?> incluir(@RequestBody TurmaDTO turmaDTO) {
    
        Professor professor = professorRepository.findById(turmaDTO.getProfessorId()).orElse(null);

        if (professor == null) {
            return ResponseEntity.badRequest().body("Professor com ID " + turmaDTO.getProfessorId() + " não encontrado.");
        }

        Turma turma = new Turma();
        turma.setAno(turmaDTO.getAno());
        turma.setPeriodo(turmaDTO.getPeriodo());
        turma.setProfessor(professor); 

        Turma novaTurma = turmaRepository.save(turma);
        return ResponseEntity.ok(novaTurma);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!turmaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        turmaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
