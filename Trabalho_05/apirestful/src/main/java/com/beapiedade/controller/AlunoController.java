package com.beapiedade.controller;

import com.beapiedade.model.Aluno;
import com.beapiedade.repository.AlunoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/aluno")
@CrossOrigin(origins = "http://localhost:3000")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @GetMapping
    public List<Aluno> listar() {
        return alunoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aluno> buscar(@PathVariable Long id) {
        Optional<Aluno> aluno = alunoRepository.findById(id);
        if (aluno.isPresent()) {
            return ResponseEntity.ok(aluno.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Aluno> incluir(@RequestBody Aluno aluno) {
        Aluno novoAluno = alunoRepository.save(aluno);
        return new ResponseEntity<>(novoAluno, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> alterar(@PathVariable Long id, @RequestBody Aluno detalhesAluno) {
        return alunoRepository.findById(id)
                .map(alunoExistente -> {
                    alunoExistente.setNome(detalhesAluno.getNome());
                    alunoExistente.setEmail(detalhesAluno.getEmail());
                    alunoExistente.setCurso(detalhesAluno.getCurso());
                    alunoExistente.setIngresso(detalhesAluno.getIngresso());
                    Aluno alunoAtualizado = alunoRepository.save(alunoExistente);
                    return ResponseEntity.ok(alunoAtualizado);
                }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!alunoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        alunoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}