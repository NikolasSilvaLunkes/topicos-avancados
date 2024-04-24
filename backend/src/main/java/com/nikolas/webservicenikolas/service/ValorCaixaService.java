package com.nikolas.webservicenikolas.service;

import com.nikolas.webservicenikolas.generic.classes.DefaultService;
import com.nikolas.webservicenikolas.model.GrupoContas;
import com.nikolas.webservicenikolas.model.ValorCaixa;
import com.nikolas.webservicenikolas.repository.IGrupoContasRepository;
import com.nikolas.webservicenikolas.repository.IValorCaixaRepository;
import org.springframework.stereotype.Service;

@Service
public class ValorCaixaService extends DefaultService<ValorCaixa, IValorCaixaRepository> {
}
