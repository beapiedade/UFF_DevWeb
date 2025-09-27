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
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private Long id;

    @Column(name="ANO")
    private int ano;

    @Column(name="PERIODO")
    private int periodo;

    @ManyToOne
    @JoinColumn(name = "professor_id")
    private Professor professor;

    @OneToMany(mappedBy = "turma", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("turma")
    private List<Inscricao> inscricoes;

    public Turma(int ano, int periodo) {
        this.ano = ano;
        this.periodo = periodo;
    }
}