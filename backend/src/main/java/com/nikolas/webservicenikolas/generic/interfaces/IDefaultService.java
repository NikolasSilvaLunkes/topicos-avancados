package com.nikolas.webservicenikolas.generic.interfaces;

import com.nikolas.webservicenikolas.generic.classes.DefaultModel;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

public interface IDefaultService<T extends DefaultModel> {

    public List<T> retornaTodos();

    public T buscaPorId(Long id);

    public List<T> listaFiltrada(Specification<T> especificacao, Pageable page);

    public T inserir(T entidade);

    public T alterar(T entidade);

    public T remover(T entidade);
}
