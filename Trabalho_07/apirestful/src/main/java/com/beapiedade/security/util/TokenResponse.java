package com.beapiedade.security.util;

public record TokenResponse(String token, long idUsuario, String nome, String role) {
}