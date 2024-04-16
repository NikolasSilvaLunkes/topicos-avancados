package com.nikolas.webservicenikolas.generic.interfaces;

import com.nikolas.webservicenikolas.generic.classes.DefaultModel;

import java.util.List;


public interface IDefaultController<T extends DefaultModel, S extends IDefaultService<T>> {
    List<T> getAll();

    T getById(Long id);

    T create(T entity);

    T update(T entity);

    void delete(T entity);
}
