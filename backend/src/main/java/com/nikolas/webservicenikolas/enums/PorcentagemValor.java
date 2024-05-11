package com.nikolas.webservicenikolas.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;


@AllArgsConstructor
@NoArgsConstructor
@Getter
public enum PorcentagemValor {
    PORCENTAGEM(1,"PORCENTAGEM"),
    VALOR(2,"VALOR");

    @Setter
    private Integer valor;
    @Setter
    private String descricao;
    private static final Map<String, PorcentagemValor> BY_DESCRICAO = new HashMap<>();

    static {
        for (PorcentagemValor e: values()) {
            BY_DESCRICAO.put(e.descricao, e);
        }
    }

    @JsonCreator
    public static PorcentagemValor valueOfDescricao(String descricao) {
        return BY_DESCRICAO.get(descricao);
    }

    @JsonValue
    @Override
    public String toString() {
        return this.descricao;
    }
}
