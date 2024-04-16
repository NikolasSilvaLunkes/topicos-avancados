package com.nikolas.webservicenikolas.generic.interfaces;

import com.nikolas.webservicenikolas.generic.classes.DefaultModel;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

@ComponentScan
public interface IDefaultRepository<T extends DefaultModel> extends CrudRepository<T, Long>, JpaSpecificationExecutor<T> {

    Page<T> findAll(Pageable pageable);

    Page<T> findAllBy(Specification<T> specification, Pageable pageable);

}
