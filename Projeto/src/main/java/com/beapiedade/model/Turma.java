package com.beapiedade.model;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="turma")
@Data
@NoArgsConstructor
public class Turma {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID")
    private Long id;

    @Column(name="MATERIA")
    private String materia;

    @Column(name="PERIODO")
    private String periodo;

    @ManyToOne
    @JoinColumn(name = "professor_id")
    private Professor professor;

    @OneToMany(mappedBy = "turma", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Inscricao> inscricoes;

    public Turma(String materia, String periodo) {
        this.materia = materia;
        this.periodo = periodo;
    }
}