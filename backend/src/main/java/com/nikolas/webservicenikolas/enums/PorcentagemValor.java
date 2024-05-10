package com.nikolas.webservicenikolas.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
public enum PorcentagemValor {
    PORCENTAGEM(1,"PORCENTAGEM"),
    VALOR(2,"VALOR");

    @Getter
    private Integer valor;
    private String descricao;

    @JsonValue
    @Override
    public String toString() {
        return this.descricao;
    }

    @JsonCreator
    public static PorcentagemValor forValue(String value) {
        for (PorcentagemValor pv : PorcentagemValor.values()) {
            if (pv.toString().equals(value)) {
                return pv;
            }
        }
        return null;
    }
}
