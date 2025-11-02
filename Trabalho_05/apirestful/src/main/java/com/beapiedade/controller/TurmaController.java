package com.beapiedade.controller;

import com.beapiedade.model.Disciplina;
import com.beapiedade.model.Professor;
import com.beapiedade.model.Turma;
import com.beapiedade.model.TurmaDTO;
import com.beapiedade.repository.ProfessorRepository;
import com.beapiedade.repository.TurmaRepository;
import com.beapiedade.repository.DisciplinaRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/turma")
@CrossOrigin(origins = "http://localhost:3000")
public class TurmaController {

    @Autowired
    private TurmaRepository turmaRepository;
    @Autowired
    private ProfessorRepository professorRepository;
    @Autowired
    private DisciplinaRepository disciplinaRepository;

    @GetMapping
    public List<Turma> listar() {
        return turmaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> incluir(@RequestBody TurmaDTO turmaDTO) {
    
        Professor professor = professorRepository.findById(turmaDTO.getProfessorId()).orElse(null);

        if (professor == null) {
            return ResponseEntity.badRequest().body("Professor com ID " + turmaDTO.getProfessorId() + " não encontrado.");
        }

        Disciplina disciplina = disciplinaRepository.findById(turmaDTO.getDisciplinaId()).orElse(null);

        Turma turma = new Turma();
        turma.setId(turmaDTO.getId());
        turma.setAno(turmaDTO.getAno());
        turma.setPeriodo(turmaDTO.getPeriodo());
        turma.setProfessor(professor);
        turma.setDisciplina(disciplina);

        Turma novaTurma = turmaRepository.save(turma);
        return ResponseEntity.ok(novaTurma);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Turma> buscar(@PathVariable String id) {
        Optional<Turma> turma = turmaRepository.findById(id);
        if (turma.isPresent()) {
            return ResponseEntity.ok(turma.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable String id) {
        if (!turmaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        turmaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
