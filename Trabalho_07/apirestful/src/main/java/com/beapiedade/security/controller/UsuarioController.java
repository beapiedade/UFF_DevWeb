package com.beapiedade.security.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.beapiedade.security.model.Usuario;
import com.beapiedade.security.util.Role;
import com.beapiedade.security.service.UsuarioService;
import com.beapiedade.security.util.InfoUsuario;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/usuario") 
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> recuperaUsuarios() {
        return usuarioService.recuperarUsuarios();
    }

    @PostMapping("/public")
    public InfoUsuario cadastrarPublico(@RequestBody @Valid Usuario usuario) {
        usuario.setRole(Role.USER); 
        return usuarioService.cadastrarUsuarioPublico(usuario);
    }

    @PostMapping("/admin")
    public InfoUsuario cadastrarAdmin(@RequestBody @Valid Usuario usuario) {
        return usuarioService.cadastrarUsuarioAdmin(usuario);
    }
}