package com.nikolas.webservicenikolas.repository;

import com.nikolas.webservicenikolas.generic.interfaces.IDefaultRepository;
import com.nikolas.webservicenikolas.model.GrupoContas;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Repository;

@ComponentScan
@Repository
public interface IGrupoContasRepository extends IDefaultRepository<GrupoContas> {
}
