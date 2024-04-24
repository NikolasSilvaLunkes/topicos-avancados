package com.nikolas.webservicenikolas.security;

import com.nikolas.webservicenikolas.model.Usuario;
import com.nikolas.webservicenikolas.repository.UsuarioRepositoryI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsuarioRepositoryI usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Usuario> usuario = usuarioRepository.findByNome(username);

        try {
            Usuario user = usuario.get();
            if (usuario == null) {
                throw new UsernameNotFoundException("User not found");
            }
            return User.withUsername(user.getNome())
                    .password(user.getPassword()) // use getPassword instead of getHashedSenha
                    .authorities(new ArrayList<>()) // Set authorities if there are any
                    .build();
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found");
        }

    }
}