package com.beapiedade.utils;

// EXCEÇÃO PERSONALIZADA PARA TRATAR ERROS
public class AlunoException extends Exception {
    public AlunoException(String mensagem) {
        super(mensagem);
    }
}