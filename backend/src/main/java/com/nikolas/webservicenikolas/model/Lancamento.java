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

    @NotNull
    private BigDecimal valor;

    private LocalDate vencimento;

    private  LocalDate baixa;

    private Character dc = 'd';

    @Transient
    private BigDecimal valorTotal;

    public BigDecimal getValorTotal() {
        if (valor == null) {
            return BigDecimal.ZERO;
        }
        BigDecimal jurosValue = (juros != null) ? juros.divide(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
        BigDecimal multaValue = (multa != null) ? multa.divide(BigDecimal.valueOf(100)) : BigDecimal.ZERO;
        BigDecimal descontosValue = (descontos != null) ? descontos.divide(BigDecimal.valueOf(100)) : BigDecimal.ZERO;

        BigDecimal total = valor;
        total = total.add(total.multiply(jurosValue));
        total = total.subtract(total.multiply(descontosValue));

        if (baixa != null && baixa.isAfter(vencimento)) {
            total = total.add(total.multiply(multaValue));
        } else if (baixa == null && LocalDate.now().isAfter(vencimento)) {
            total = total.add(total.multiply(multaValue));
        }

        return total;
    }
}
