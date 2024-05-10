package com.nikolas.webservicenikolas.enums.converters;
import com.nikolas.webservicenikolas.enums.PorcentagemValor;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
@Converter(autoApply = true)
public class PorcentagemValorConverter implements AttributeConverter<PorcentagemValor, Integer> {

    @Override
    public Integer convertToDatabaseColumn(PorcentagemValor attribute) {
        return attribute != null ? attribute.getValor() : null;
    }

    @Override
    public PorcentagemValor convertToEntityAttribute(Integer dbData) {
        if (dbData != null) {
            for (PorcentagemValor pv : PorcentagemValor.values()) {
                if (pv.getValor() == dbData) {
                    return pv;
                }
            }
        }
        return null;
    }
}