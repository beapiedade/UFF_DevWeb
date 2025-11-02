package com.beapiedade.model;

import jakarta.persistence.*;
import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name="inscricao")

@Data
@NoArgsConstructor
public class Inscricao {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private Long id;

    @Column(name="DATAHORA")
    private LocalDate dataHora;

    @ManyToOne
    @JoinColumn(name = "aluno", nullable = false)
    @JsonIgnoreProperties("inscricoes")
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "turma", nullable = false)
    @JsonIgnoreProperties("inscricoes")
    private Turma turma;

    public Inscricao(LocalDate dataHora) {
        this.dataHora = dataHora;
    }
}