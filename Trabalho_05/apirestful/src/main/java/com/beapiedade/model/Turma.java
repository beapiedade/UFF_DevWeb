package com.beapiedade.model;

import jakarta.persistence.*;
import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="turma")
@Data
@NoArgsConstructor
public class Turma {

    @Id
    @Column(name="ID")
    private String id;

    @Column(name="ANO")
    private int ano;

    @Column(name="PERIODO")
    private int periodo;

    @OneToMany(mappedBy = "turma", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("turma")
    private List<Inscricao> inscricoes;

    @ManyToOne
    @JoinColumn(name = "professor")
    private Professor professor;

    @ManyToOne
    @JoinColumn(name = "disciplina", nullable = false)
    @JsonIgnoreProperties("disciplina")
    private Disciplina disciplina;

    public Turma(int ano, int periodo) {
        this.ano = ano;
        this.periodo = periodo;
    }
}