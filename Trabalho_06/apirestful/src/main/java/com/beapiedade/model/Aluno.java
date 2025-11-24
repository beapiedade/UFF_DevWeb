package com.beapiedade.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
    
    @Column(name="EMAIL", unique = true)
    private String email;
    
    @Column(name="CURSO")
    private String curso;

    @Column(name="INGRESSO")
    private LocalDate ingresso;

    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("aluno")
    private List<Inscricao> inscricoes;

    public Aluno(String nome, String curso, String email, LocalDate ingresso) {
        this.nome = nome;
        this.curso = curso;
        this.email = email;
        this.ingresso = ingresso;
    }
}