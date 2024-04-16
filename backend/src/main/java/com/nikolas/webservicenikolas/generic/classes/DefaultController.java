package com.nikolas.webservicenikolas.generic.classes;

import com.nikolas.webservicenikolas.generic.interfaces.IDefaultController;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
public abstract class DefaultController<T extends DefaultModel, S extends DefaultService<T>> implements IDefaultController<T, S> {

    @Getter
    @Setter
    public final S service;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<T> getAll() {
        List<T> entities = service.retornaTodos();
        return entities;
    }

    @QueryMapping
    public T byId(@Argument Long id) {
        return service.buscaPorId(id);
    }

    @GetMapping("/{id}")
    public T getById(@PathVariable Long id) {
        return service.buscaPorId(id);
    }

    @PostMapping
    public T create(@RequestBody T entity) {
        return service.inserir(entity);
    }

    @PutMapping
    public T update(@RequestBody T entity) {
        return service.alterar(entity);
    }

    @DeleteMapping
    public void delete(@RequestBody T entity) {
        service.remover(entity);
    }
}