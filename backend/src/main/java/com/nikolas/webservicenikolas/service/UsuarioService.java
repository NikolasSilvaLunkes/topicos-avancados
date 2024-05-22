package com.nikolas.webservicenikolas.service;

import com.nikolas.webservicenikolas.generic.classes.DefaultService;
import com.nikolas.webservicenikolas.model.Lancamento;
import com.nikolas.webservicenikolas.model.Usuario;
import com.nikolas.webservicenikolas.repository.UsuarioRepositoryI;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UsuarioService extends DefaultService<Usuario, UsuarioRepositoryI> {

    public Usuario findByUsername(String username) {
        return getRepository().findByNome(username).get();
    }



}
