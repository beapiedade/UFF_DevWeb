package com.beapiedade.model;

import javax.persistence.*;
import java.time.LocalDate;

// ENTIDADE PRINCIPAL DO PROJETO
@Entity
@Table(name="aluno")

public class Aluno {

    private Long matricula;
    private String nome;
    private String curso;
    private LocalDate ingresso;

    public Aluno() {}

    public Aluno(String nome, String curso, LocalDate ingresso) {
        this.nome = nome;
        this.curso = curso;
        this.ingresso = ingresso;
    }

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)

    @Column(name="MATRICULA")
    public Long getMatricula() {	
        return matricula;
    }

    @Column(name="NOME")
    public String getNome() {	
        return nome;
    }

    @Column(name="CURSO")
    public String getCurso() {	
        return curso;
    }

    @Column(name="INGRESSO")
    public LocalDate getIngresso() {	
        return ingresso;
    }

    public void setMatricula(Long matricula) {
        this.matricula = matricula;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public void setIngresso(LocalDate ingresso) {
        this.ingresso = ingresso;
    }
}


