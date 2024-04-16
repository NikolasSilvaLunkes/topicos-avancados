package com.nikolas.webservicenikolas.feign.example;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExamplePessoa {
    Long id;
    String name;
    String email;
}
