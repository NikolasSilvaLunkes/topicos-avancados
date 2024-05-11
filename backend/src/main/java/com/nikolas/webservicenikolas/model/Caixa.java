package com.nikolas.webservicenikolas.model;

import com.nikolas.webservicenikolas.generic.classes.DefaultModel;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Caixa extends DefaultModel {

    @OneToOne(cascade = CascadeType.PERSIST)
    private ValorCaixa juros;

    @OneToOne(cascade = CascadeType.PERSIST)
    private ValorCaixa multa;

    @OneToOne(cascade = CascadeType.PERSIST)
    private ValorCaixa acrescimos;

    @OneToOne(cascade = CascadeType.PERSIST)
    private ValorCaixa descontos;
}


/*
*
* default:
* {
    "dataCriacao": null,
    "operador": null,
    "juros": {
        "indice": 0.03,
        "porcentagemValor": "PORCENTAGEM"
    },
    "multa": {
        "indice": 1,
        "porcentagemValor": "PORCENTAGEM"
    },
    "acrescimos": {
        "indice": 0,
        "porcentagemValor": "VALOR"
    },
    "descontos": {
        "indice": 5,
        "porcentagemValor": "PORCENTAGEM"
    }
}
* */