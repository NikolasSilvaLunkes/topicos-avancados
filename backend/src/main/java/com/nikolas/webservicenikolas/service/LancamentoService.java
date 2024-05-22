package com.nikolas.webservicenikolas.service;

import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfWriter;
import com.nikolas.webservicenikolas.generic.classes.DefaultService;
import com.nikolas.webservicenikolas.model.Caixa;
import com.nikolas.webservicenikolas.model.Lancamento;
import com.nikolas.webservicenikolas.repository.ICaixaRepository;
import com.nikolas.webservicenikolas.repository.ILancamentoRepository;
import com.opencsv.CSVWriter;
import org.springframework.stereotype.Service;



import java.io.IOException;
import java.io.StringWriter;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import com.itextpdf.text.Document;
import com.itextpdf.text.pdf.PdfPTable;
import java.io.ByteArrayOutputStream;

@Service
public class LancamentoService extends DefaultService<Lancamento, ILancamentoRepository> {

    public byte[] generatePdfReport() {
        Iterable<Lancamento> lancamentosIterable = getRepository().findAll();
        List<Lancamento> lancamentos = StreamSupport.stream(lancamentosIterable.spliterator(), false).collect(Collectors.toList());

        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            Document document = new Document(PageSize.A4, 0, 0, 0, 0);
            PdfWriter.getInstance(document, out);
            document.open();
            PdfPTable table = new PdfPTable(12);
            int[] relativeWidths = {1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1};
            table.setWidths(relativeWidths);

            table.addCell("Juros");
            table.addCell("Multa");
            table.addCell("Acrescimos");
            table.addCell("Descontos");
            table.addCell("Historico");
            table.addCell("Data");
            table.addCell("Valor");
            table.addCell("Vencimento");
            table.addCell("Baixa");
            table.addCell("DebitoCredito");
            table.addCell("ValorTotal");
            table.addCell("GrupoContas");

            for (Lancamento lancamento : lancamentos) {
                table.addCell(lancamento.getJuros() != null ? lancamento.getJuros().setScale(2, RoundingMode.HALF_UP).toString() : "N/A");
                table.addCell(lancamento.getMulta() != null ? lancamento.getMulta().setScale(2, RoundingMode.HALF_UP).toString() : "N/A");
                table.addCell(lancamento.getAcrescimos() != null ? lancamento.getAcrescimos().setScale(2, RoundingMode.HALF_UP).toString() : "N/A");
                table.addCell(lancamento.getDescontos() != null ? lancamento.getDescontos().setScale(2, RoundingMode.HALF_UP).toString() : "N/A");
                table.addCell(lancamento.getHistorico() != null ? lancamento.getHistorico() : "N/A");
                table.addCell(lancamento.getData() != null ? lancamento.getData().toString() : "N/A");
                table.addCell(lancamento.getValor() != null ? lancamento.getValor().setScale(2, RoundingMode.HALF_UP).toString() : "N/A");
                table.addCell(lancamento.getVencimento() != null ? lancamento.getVencimento().toString() : "N/A");
                table.addCell(lancamento.getBaixa() != null ? lancamento.getBaixa().toString() : "N/A");
                table.addCell(lancamento.getDebitoCredito() != null ? lancamento.getDebitoCredito().toString() : "N/A");
                table.addCell(lancamento.getValorTotal() != null ? lancamento.getValorTotal().setScale(2, RoundingMode.HALF_UP).toString() : "N/A");
                table.addCell(lancamento.getGrupoContas() != null ? lancamento.getGrupoContas().toString() : "N/A");
            }

            document.add(table);

            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return out.toByteArray();
    }

//    public String generateXmlReport() {
//        Iterable<Lancamento> lancamentosIterable = getRepository().findAll();
//        List<Lancamento> lancamentos = StreamSupport.stream(lancamentosIterable.spliterator(), false).collect(Collectors.toList());
//
//        try {
//            JAXBContext jaxbContext = JAXBContext.newInstance(Lancamento.class);
//            Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
//
//            // To format the XML output
//            jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);
//
//            StringWriter sw = new StringWriter();
//
//            // Iterate over lancamentos and marshal each one to the StringWriter
//            for (Lancamento lancamento : lancamentos) {
//                jaxbMarshaller.marshal(lancamento, sw);
//            }
//
//            return sw.toString();
//        } catch (JAXBException e) {
//            e.printStackTrace();
//            return null;
//        }
//    }

    public byte[] generateCsvReport() throws IOException {
        Iterable<Lancamento> lancamentosIterable = getRepository().findAll();
        List<Lancamento> lancamentos = StreamSupport.stream(lancamentosIterable.spliterator(), false).collect(Collectors.toList());

        StringWriter writer = new StringWriter();
        CSVWriter csvWriter = new CSVWriter(writer);

        // Write header
        String[] header = {"Juros", "Multa", "Acrescimos", "Descontos", "Historico", "Data", "Valor", "Vencimento", "Baixa", "DebitoCredito", "ValorTotal", "GrupoContas"};
        csvWriter.writeNext(header);

        // Write data
        for (Lancamento lancamento : lancamentos) {
            String[] data = {
                    lancamento.getJuros() != null ? lancamento.getJuros().setScale(2, RoundingMode.HALF_UP).toString() : "N/A",
                    lancamento.getMulta() != null ? lancamento.getMulta().setScale(2, RoundingMode.HALF_UP).toString() : "N/A",
                    lancamento.getAcrescimos() != null ? lancamento.getAcrescimos().setScale(2, RoundingMode.HALF_UP).toString() : "N/A",
                    lancamento.getDescontos() != null ? lancamento.getDescontos().setScale(2, RoundingMode.HALF_UP).toString() : "N/A",
                    lancamento.getHistorico() != null ? lancamento.getHistorico() : "N/A",
                    lancamento.getData() != null ? lancamento.getData().toString() : "N/A",
                    lancamento.getValor() != null ? lancamento.getValor().setScale(2, RoundingMode.HALF_UP).toString() : "N/A",
                    lancamento.getVencimento() != null ? lancamento.getVencimento().toString() : "N/A",
                    lancamento.getBaixa() != null ? lancamento.getBaixa().toString() : "N/A",
                    lancamento.getDebitoCredito() != null ? lancamento.getDebitoCredito().toString() : "N/A",
                    lancamento.getValorTotal() != null ? lancamento.getValorTotal().setScale(2, RoundingMode.HALF_UP).toString() : "N/A",
                    lancamento.getGrupoContas() != null ? lancamento.getGrupoContas().toString() : "N/A"
            };
            csvWriter.writeNext(data);
        }

        csvWriter.close();

        return writer.toString().getBytes();
    }

}
