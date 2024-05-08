package com.nikolas.webservicenikolas.controller;

import com.nikolas.webservicenikolas.generic.classes.DefaultController;
import com.nikolas.webservicenikolas.model.Caixa;
import com.nikolas.webservicenikolas.model.Lancamento;
import com.nikolas.webservicenikolas.repository.ICaixaRepository;
import com.nikolas.webservicenikolas.repository.ILancamentoRepository;
import com.nikolas.webservicenikolas.service.CaixaService;
import com.nikolas.webservicenikolas.service.LancamentoService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/lancamento")
public class LancamentoController extends DefaultController<Lancamento, ILancamentoRepository, LancamentoService> {
    public LancamentoController(LancamentoService service) {
        super(service);
    }

}








