package com.nikolas.webservicenikolas.controller;

import com.nikolas.webservicenikolas.generic.classes.DefaultController;
import com.nikolas.webservicenikolas.model.GrupoContas;
import com.nikolas.webservicenikolas.service.GrupoContasService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/grupoContas")
public class GrupoContasController extends DefaultController<GrupoContas, GrupoContasService> {
    public GrupoContasController(GrupoContasService service) {
        super(service);
    }


}








