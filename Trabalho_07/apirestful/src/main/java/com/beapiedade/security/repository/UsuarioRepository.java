package com.beapiedade.security.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.beapiedade.security.model.Usuario;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
}