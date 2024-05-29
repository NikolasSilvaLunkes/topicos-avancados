package com.nikolas.webservicenikolas.model;

import com.nikolas.webservicenikolas.enums.PorcentagemValor;
import com.nikolas.webservicenikolas.generic.classes.DefaultModel;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

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

    private Character debitoCredito = 'D';

    @Transient
    private BigDecimal valorTotal;

    @ManyToOne
    private GrupoContas grupoContas;

    public BigDecimal getValorTotal() {
        if (valor == null) {
            return BigDecimal.ZERO;
        }

        PorcentagemValor tipoMulta = caixa.getMulta().getPorcentagemValor();
        PorcentagemValor tipoJuros = caixa.getJuros().getPorcentagemValor();
        PorcentagemValor tipoAcrescimos = caixa.getAcrescimos().getPorcentagemValor();
        PorcentagemValor tipoDescontos = caixa.getDescontos().getPorcentagemValor();

        BigDecimal total = valor;
        if (baixa != null && baixa.isAfter(vencimento) || baixa == null && LocalDate.now().isAfter(vencimento)) {
            if (tipoMulta == PorcentagemValor.PORCENTAGEM) {
                total = total.add(total.multiply(multa.divide(BigDecimal.valueOf(100))));
            } else {
                total = total.add(multa);
            }



        }

        long daysBetween = 0;
        if (data != null && baixa != null) {
            daysBetween = ChronoUnit.DAYS.between(data, baixa);
        }

        if (tipoJuros == PorcentagemValor.PORCENTAGEM) {
            BigDecimal jurosPerDay = juros.divide(BigDecimal.valueOf(100));
            BigDecimal totalJuros = jurosPerDay.multiply(BigDecimal.valueOf(daysBetween));
            total = total.add(total.multiply(totalJuros));
        } else {
            BigDecimal totalJuros = juros.multiply(BigDecimal.valueOf(daysBetween));
            total = total.add(totalJuros);
        }

        if (tipoAcrescimos == PorcentagemValor.PORCENTAGEM) {
            total = total.add(total.multiply(acrescimos.divide(BigDecimal.valueOf(100))));
        } else {
            total = total.add(acrescimos);
        }

        if (tipoDescontos == PorcentagemValor.PORCENTAGEM) {
            total = total.subtract(total.multiply(descontos.divide(BigDecimal.valueOf(100))));
        } else {
            total = total.subtract(descontos);
        }

        return total;
    }
}
