package com.beapiedade.model;

import jakarta.persistence.*;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="disciplina")
@Data
@NoArgsConstructor
public class Disciplina {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private Long id;

    @Column(name="NOME")
    private String nome;

    @Column(name="CARGA_HORARIA")
    private int cargaHoraria;

    @OneToMany(mappedBy = "disciplina")
    @JsonIgnore
    private List<Turma> turmas;

    public Disciplina(String nome, int cargaHoraria) {
        this.nome = nome;
        this.cargaHoraria = cargaHoraria;
    }
}