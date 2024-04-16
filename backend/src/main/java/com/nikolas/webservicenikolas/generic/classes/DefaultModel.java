package com.nikolas.webservicenikolas.generic.classes;

import com.nikolas.webservicenikolas.model.Usuario;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor
@Data
public abstract class DefaultModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDateTime dataCriacao;

    @ManyToOne
    private Usuario operador;

}
