package com.beapiedade.model;

import java.time.LocalDate;
import lombok.Data;

@Data
public class InscricaoDTO {
    private Long alunoId;
    private String turmaId;
    private LocalDate dataHora;
}