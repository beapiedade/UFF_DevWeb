package com.beapiedade.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

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
    @NotBlank(message = "Nome é obrigatório.")
    @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres.")
    private String nome;
    
    @Column(name="EMAIL", unique = true)
    @NotBlank(message = "E-mail é obrigatório.")
    @Email(message = "E-mail inválido.")
    private String email;
    
    @Column(name="CURSO")
    @NotBlank(message = "Curso é obrigatório.")
    @Size(min = 3, max = 100, message = "Curso deve ter entre 3 e 100 caracteres.")
    private String curso;

    @Column(name="INGRESSO")
    @NotNull(message = "Data de ingresso é obrigatória.")
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