package com.nikolas.webservicenikolas.model;

import com.nikolas.webservicenikolas.enums.PorcentagemValor;
import com.nikolas.webservicenikolas.generic.classes.DefaultModel;
import jakarta.persistence.Entity;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ValorCaixa extends DefaultModel {

    private BigDecimal indice;

    private PorcentagemValor porcentagemValor;
    
}

