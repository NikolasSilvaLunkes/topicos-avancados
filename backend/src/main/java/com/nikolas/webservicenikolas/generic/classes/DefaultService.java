package com.nikolas.webservicenikolas.generic.classes;

import com.nikolas.webservicenikolas.generic.interfaces.IDefaultRepository;
import com.nikolas.webservicenikolas.generic.interfaces.IDefaultService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public abstract class DefaultService<T extends DefaultModel, I extends IDefaultRepository<T>> implements IDefaultService<T> {

    @Getter
    @Autowired
    I repository;



    @Override
    public List<T> retornaTodos() {
        return (List<T>) repository.findAll();
    }

    @Override
    public T buscaPorId(Long id) {
        return (T) repository.findById(id).orElse(null);
    }

    @Override
    public List<T> listaFiltrada(Specification<T> especificacao, Pageable page) {
        return (List<T>) repository.findAllBy(especificacao, page);
    }

    @Override
    public T inserir(T entidade) {
        return (T) repository.save(entidade);
    }

    @Override
    public T alterar(T entidade) {
        return (T) repository.save(entidade);
    }

    @Override
    public T remover(T entidade) {
        repository.delete(entidade);
        return entidade;
    }
}
