package com.nikolas.webservicenikolas.service;

import com.nikolas.webservicenikolas.generic.classes.DefaultService;
import com.nikolas.webservicenikolas.model.Caixa;
import com.nikolas.webservicenikolas.repository.ICaixaRepository;
import org.springframework.stereotype.Service;

@Service
public class CaixaService extends DefaultService<Caixa, ICaixaRepository> {
}
