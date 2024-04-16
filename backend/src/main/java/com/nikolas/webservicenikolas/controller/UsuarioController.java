package com.nikolas.webservicenikolas.controller;

import com.nikolas.webservicenikolas.generic.classes.DefaultController;
import com.nikolas.webservicenikolas.model.Usuario;
import com.nikolas.webservicenikolas.service.UsuarioService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuario")
public class UsuarioController extends DefaultController<Usuario, UsuarioService> {
    public UsuarioController(UsuarioService service) {
        super(service);
    }
}








