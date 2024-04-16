package com.nikolas.webservicenikolas.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public enum PorcentagemValor {
    PORCENTAGEM('P'),
    VALOR('V');


    @Getter
    private char valor;

}
