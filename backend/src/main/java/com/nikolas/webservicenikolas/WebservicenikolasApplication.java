package com.nikolas.webservicenikolas;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableFeignClients(basePackages = "com.nikolas.webservicenikolas.feign")
@EntityScan("com.nikolas.webservicenikolas.model")
@EnableJpaRepositories("com.nikolas.webservicenikolas.repository")
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class, UserDetailsServiceAutoConfiguration.class})
public class WebservicenikolasApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebservicenikolasApplication.class, args);

    }


}
