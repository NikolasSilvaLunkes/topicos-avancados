package com.nikolas.webservicenikolas.model;

import com.nikolas.webservicenikolas.enums.PorcentagemValor;
import com.nikolas.webservicenikolas.generic.classes.DefaultModel;
import jakarta.persistence.*;
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


    @Enumerated(EnumType.ORDINAL)
    private PorcentagemValor porcentagemValor;
    
}

