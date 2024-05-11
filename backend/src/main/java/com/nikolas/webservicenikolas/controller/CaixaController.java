package com.nikolas.webservicenikolas.controller;

import com.nikolas.webservicenikolas.generic.classes.DefaultController;
import com.nikolas.webservicenikolas.model.Caixa;
import com.nikolas.webservicenikolas.repository.ICaixaRepository;
import com.nikolas.webservicenikolas.repository.IValorCaixaRepository;
import com.nikolas.webservicenikolas.service.CaixaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/caixa")
public class CaixaController extends DefaultController<Caixa, ICaixaRepository, CaixaService> {
    public CaixaController(CaixaService service) {
        super(service);
    }

    @Autowired
    IValorCaixaRepository valorCaixaRepository;

    @Override
    @PutMapping
    public Caixa update(@RequestBody Caixa caixa) {
        Caixa existingCaixa = this.getService().buscaPorId(caixa.getId());

        existingCaixa.getJuros().setIndice(caixa.getJuros().getIndice());
        existingCaixa.getJuros().setPorcentagemValor(caixa.getJuros().getPorcentagemValor());
        valorCaixaRepository.save(existingCaixa.getJuros());

        existingCaixa.getMulta().setIndice(caixa.getMulta().getIndice());
        existingCaixa.getMulta().setPorcentagemValor(caixa.getMulta().getPorcentagemValor());
        valorCaixaRepository.save(existingCaixa.getMulta());

        existingCaixa.getAcrescimos().setIndice(caixa.getAcrescimos().getIndice());
        existingCaixa.getAcrescimos().setPorcentagemValor(caixa.getAcrescimos().getPorcentagemValor());
        valorCaixaRepository.save(existingCaixa.getAcrescimos());

        existingCaixa.getDescontos().setIndice(caixa.getDescontos().getIndice());
        existingCaixa.getDescontos().setPorcentagemValor(caixa.getDescontos().getPorcentagemValor());
        valorCaixaRepository.save(existingCaixa.getDescontos());

        return this.getService().alterar(existingCaixa);
    }

}








