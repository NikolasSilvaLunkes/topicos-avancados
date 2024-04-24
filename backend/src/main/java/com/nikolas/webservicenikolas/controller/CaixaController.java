package com.nikolas.webservicenikolas.controller;

import com.nikolas.webservicenikolas.generic.classes.DefaultController;
import com.nikolas.webservicenikolas.model.Caixa;
import com.nikolas.webservicenikolas.repository.ICaixaRepository;
import com.nikolas.webservicenikolas.service.CaixaService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/caixa")
public class CaixaController extends DefaultController<Caixa, ICaixaRepository, CaixaService> {
    public CaixaController(CaixaService service) {
        super(service);
    }


}








