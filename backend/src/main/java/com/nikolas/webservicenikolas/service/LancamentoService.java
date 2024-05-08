package com.nikolas.webservicenikolas.service;

import com.nikolas.webservicenikolas.generic.classes.DefaultService;
import com.nikolas.webservicenikolas.model.Caixa;
import com.nikolas.webservicenikolas.model.Lancamento;
import com.nikolas.webservicenikolas.repository.ICaixaRepository;
import com.nikolas.webservicenikolas.repository.ILancamentoRepository;
import org.springframework.stereotype.Service;

@Service
public class LancamentoService extends DefaultService<Lancamento, ILancamentoRepository> {
}
