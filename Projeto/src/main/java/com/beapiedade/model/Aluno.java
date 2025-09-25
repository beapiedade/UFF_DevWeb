package com.beapiedade.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="aluno")

@Data
@NoArgsConstructor
public class Aluno {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private Long id;

    @Column(name="NOME")
    private String nome;
    
    @Column(name="CURSO")
    private String curso;

    @Column(name="INGRESSO")
    private LocalDate ingresso;

    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Inscricao> inscricoes;

    public Aluno(String nome, String curso, LocalDate ingresso) {
        this.nome = nome;
        this.curso = curso;
        this.ingresso = ingresso;
    }
}