package com.nikolas.webservicenikolas.model;

import com.nikolas.webservicenikolas.generic.classes.DefaultModel;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Lancamento extends DefaultModel {

    @ManyToOne
    Caixa caixa;

    private BigDecimal juros;

    private BigDecimal multa;

    private BigDecimal acrescimos;

    private BigDecimal descontos;

    @NotNull
    private String historico;

    @NotNull
    private LocalDate data;

    private LocalDate vencimento;

    private  LocalDate baixa;

    private Character dc = 'd';

}
