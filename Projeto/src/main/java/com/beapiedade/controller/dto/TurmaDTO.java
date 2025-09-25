package com.beapiedade.controller.dto;

import lombok.Data;

@Data
public class TurmaDTO {
    private String materia;
    private String periodo;
    private Long professorId;
}