package com.beapiedade.controller;

import com.beapiedade.model.Professor;
import com.beapiedade.repository.ProfessorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/professor")
@CrossOrigin(origins = "*")
public class ProfessorController {

    @Autowired
    private ProfessorRepository professorRepository;

    @GetMapping
    public List<Professor> listar() {
        return professorRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Professor> buscar(@PathVariable Long id) {
        return professorRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Professor incluir(@RequestBody Professor professor) {
        return professorRepository.save(professor);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Professor> alterar(@PathVariable Long id, @RequestBody Professor detalhesProfessor) {
        return professorRepository.findById(id)
                .map(professor -> {
                    professor.setNome(detalhesProfessor.getNome());
                    professor.setEmail(detalhesProfessor.getEmail());
                    Professor atualizado = professorRepository.save(professor);
                    return ResponseEntity.ok(atualizado);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!professorRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        professorRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
