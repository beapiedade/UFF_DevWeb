package com.beapiedade.model;

import jakarta.persistence.*;
import java.time.LocalDate;

import lombok.Data;
import lombok.NoArgsConstructor;

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
    @JoinColumn(name = "aluno_id", nullable = false)
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "turma_id", nullable = false)
    private Turma turma;

    public Inscricao(LocalDate dataHora) {
        this.dataHora = dataHora;
    }
}