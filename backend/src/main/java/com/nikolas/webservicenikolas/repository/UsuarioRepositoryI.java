package com.nikolas.webservicenikolas.repository;

import com.nikolas.webservicenikolas.generic.interfaces.IDefaultRepository;
import com.nikolas.webservicenikolas.model.Usuario;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@ComponentScan
@Repository
public interface UsuarioRepositoryI extends IDefaultRepository<Usuario> {
    Optional<Usuario> findByNome(String nome);
    Set<Usuario> findAllByNome(String nome);
}
