package com.beapiedade.controller;

import com.beapiedade.model.Disciplina;
import com.beapiedade.repository.DisciplinaRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/disciplina")
@CrossOrigin(origins = "*")
public class DisciplinaController {

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    @GetMapping
    public List<Disciplina> listar() {
        return disciplinaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> incluir(@RequestBody Disciplina disciplina) {
        Disciplina novaDisciplina = disciplinaRepository.save(disciplina);
        return new ResponseEntity<>(novaDisciplina, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!disciplinaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        disciplinaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
