package com.nikolas.webservicenikolas.service;

import com.nikolas.webservicenikolas.generic.classes.DefaultService;
import com.nikolas.webservicenikolas.model.Usuario;
import org.springframework.stereotype.Service;


@Service
public class UsuarioService extends DefaultService<Usuario> {

    Usuario findByUsername(String username) {
        return null;
    }
}
