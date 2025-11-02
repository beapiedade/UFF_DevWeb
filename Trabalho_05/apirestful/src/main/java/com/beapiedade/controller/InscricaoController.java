package com.beapiedade.controller;

import com.beapiedade.model.Aluno;
import com.beapiedade.model.Inscricao;
import com.beapiedade.model.InscricaoDTO;
import com.beapiedade.model.Turma;
import com.beapiedade.repository.AlunoRepository;
import com.beapiedade.repository.InscricaoRepository;
import com.beapiedade.repository.TurmaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/inscricao")
@CrossOrigin(origins = "http://localhost:3000")
public class InscricaoController {

    @Autowired
    private InscricaoRepository inscricaoRepository;
    @Autowired
    private AlunoRepository alunoRepository;
    @Autowired
    private TurmaRepository turmaRepository;

    @PostMapping
    public ResponseEntity<?> incluir(@RequestBody InscricaoDTO inscricaoDTO) {
        Aluno aluno = alunoRepository.findById(inscricaoDTO.getAlunoId()).orElse(null);
        if (aluno == null) {
            return ResponseEntity.badRequest().body("Aluno com ID " + inscricaoDTO.getAlunoId() + " não encontrado.");
        }

        Turma turma = turmaRepository.findById(inscricaoDTO.getTurmaId()).orElse(null);
        if (turma == null) {
            return ResponseEntity.badRequest().body("Turma com ID " + inscricaoDTO.getTurmaId() + " não encontrada.");
        }

        Inscricao inscricao = new Inscricao();
        inscricao.setAluno(aluno);
        inscricao.setTurma(turma);
        inscricao.setDataHora(LocalDate.now());

        Inscricao novaInscricao = inscricaoRepository.save(inscricao);
        return ResponseEntity.ok(novaInscricao);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        if (!inscricaoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        inscricaoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
