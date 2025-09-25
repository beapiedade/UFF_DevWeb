package com.beapiedade.controller.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class InscricaoDTO {
    private Long alunoId;
    private Long turmaId;
    private LocalDate dataHora;
}