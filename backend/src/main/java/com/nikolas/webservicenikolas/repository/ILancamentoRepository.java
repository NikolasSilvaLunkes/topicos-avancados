package com.nikolas.webservicenikolas.repository;

import com.nikolas.webservicenikolas.generic.interfaces.IDefaultRepository;
import com.nikolas.webservicenikolas.model.Caixa;
import com.nikolas.webservicenikolas.model.Lancamento;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Repository;

@ComponentScan
@Repository
public interface ILancamentoRepository extends IDefaultRepository<Lancamento> {
}
