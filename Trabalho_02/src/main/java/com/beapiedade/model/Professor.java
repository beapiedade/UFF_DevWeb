package com.beapiedade.model;

import jakarta.persistence.*;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="professor")

@Data
@NoArgsConstructor
public class Professor {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private Long id;

    @Column(name="NOME")
    private String nome;

    @Column(name="EMAIL")
    private String email;

    @Column(name="DEPARTAMENTO")
    private String departamento;

    @OneToMany(mappedBy = "professor")
    @JsonIgnore
    private List<Turma> turmas;

    public Professor(String nome, String email, String departamento) {
        this.nome = nome;
        this.email = email;
        this.departamento = departamento;
    }
}