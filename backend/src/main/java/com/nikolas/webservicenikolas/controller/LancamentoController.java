package com.nikolas.webservicenikolas.controller;

import com.nikolas.webservicenikolas.generic.classes.DefaultController;
import com.nikolas.webservicenikolas.model.Lancamento;
import com.nikolas.webservicenikolas.repository.ILancamentoRepository;
import com.nikolas.webservicenikolas.service.LancamentoService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/lancamento")
public class LancamentoController extends DefaultController<Lancamento, ILancamentoRepository, LancamentoService> {
    public LancamentoController(LancamentoService service) {
        super(service);
    }

    @PostMapping("/report/pdf")
    public ResponseEntity<byte[]> generatePdfReport(@RequestBody List<Lancamento> lancamentos) {
        byte[] contents = service.generatePdfReport(lancamentos);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        String filename = "report.pdf";
        headers.setContentDispositionFormData(filename, filename);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.OK);
        return response;
    }

    @PostMapping("/report/csv")
    public ResponseEntity<byte[]> generateCsvReport(@RequestBody List<Lancamento> lancamentos) throws IOException {
        byte[] contents = service.generateCsvReport(lancamentos);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/csv"));
        String filename = "report.csv";
        headers.setContentDispositionFormData(filename, filename);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.OK);
        return response;
    }
}








