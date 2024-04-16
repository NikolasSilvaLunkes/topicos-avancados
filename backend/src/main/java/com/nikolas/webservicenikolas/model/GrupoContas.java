package com.nikolas.webservicenikolas.model;

import com.nikolas.webservicenikolas.generic.classes.DefaultModel;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class GrupoContas extends DefaultModel {

    @NotNull
    private Long numero;

    @NotNull
    private String agrupamento;

    @NotNull
    private String descricao;

    @NotNull
    private Character tipo;

    @Null
    @ManyToOne
    private GrupoContas pai;

    @OneToMany
    private Set<GrupoContas> filho;

}
