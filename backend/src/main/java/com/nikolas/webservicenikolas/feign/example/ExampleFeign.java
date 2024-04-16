package com.nikolas.webservicenikolas.feign.example;

import feign.Headers;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;


@Headers("Authorization: e8ea876f49a6de0c5132a2889d4d35e6bdd81e3a3f3048691862fa490375d0bb")
@FeignClient(name = "ExampleFeign", url = "${feign.example.url}")
public interface ExampleFeign {

    @GetMapping("/cadastre.get-clients")
    List<ExamplePessoa> getClientes();
}