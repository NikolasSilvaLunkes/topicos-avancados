package com.nikolas.webservicenikolas.controller;

import com.nikolas.webservicenikolas.generic.classes.DefaultController;
import com.nikolas.webservicenikolas.model.Lancamento;
import com.nikolas.webservicenikolas.repository.ILancamentoRepository;
import com.nikolas.webservicenikolas.service.LancamentoService;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.MediaType;

import java.io.IOException;


@RestController
@RequestMapping("/lancamento")
public class LancamentoController extends DefaultController<Lancamento, ILancamentoRepository, LancamentoService> {
    public LancamentoController(LancamentoService service) {
        super(service);
    }

    @GetMapping("/report/pdf")
    public ResponseEntity<byte[]> generatePdfReport() {
        byte[] contents = service.generatePdfReport();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        String filename = "report.pdf";
        headers.setContentDispositionFormData(filename, filename);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.OK);
        return response;
    }

//    @GetMapping("/report/xml")
//    public ResponseEntity<String> generateXmlReport() {
//        String xml = service.generateXmlReport();
//        if (xml == null) {
//            return ResponseEntity.internalServerError().build();
//        }
//        return ResponseEntity.ok().contentType(MediaType.APPLICATION_XML).body(xml);
//    }

    @GetMapping("/report/csv")
    public ResponseEntity<byte[]> generateCsvReport() throws IOException {
        byte[] contents = service.generateCsvReport();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("text/csv"));
        String filename = "report.csv";
        headers.setContentDispositionFormData(filename, filename);
        headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
        ResponseEntity<byte[]> response = new ResponseEntity<>(contents, headers, HttpStatus.OK);
        return response;
    }
}








