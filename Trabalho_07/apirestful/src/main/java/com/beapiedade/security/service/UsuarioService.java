package com.beapiedade.security.service;

import com.beapiedade.security.model.Usuario;
import com.beapiedade.security.repository.UsuarioRepository;
import com.beapiedade.security.util.InfoUsuario;
import com.beapiedade.security.util.Role;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    private InfoUsuario cadastrar(Usuario usuario) {
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuarioRepository.save(usuario);
        return new InfoUsuario(true, false, "Usuário salvo com sucesso!");
    }

    public InfoUsuario cadastrarUsuarioPublico(Usuario usuario) {
        return cadastrar(usuario);
    }

    public InfoUsuario cadastrarUsuarioAdmin(Usuario usuario) {
        return cadastrar(usuario);
    }

    public List<Usuario> recuperarUsuarios() {
        return usuarioRepository.findAll();
    }
}