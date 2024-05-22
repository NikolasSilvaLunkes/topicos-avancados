package com.nikolas.webservicenikolas.controller;

import com.nikolas.webservicenikolas.security.JwtAuthenticationResponse;
import com.nikolas.webservicenikolas.security.JwtTokenProvider;
import com.nikolas.webservicenikolas.model.Usuario;
import com.nikolas.webservicenikolas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenProvider tokenProvider;

    @Autowired
    UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody Usuario loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getNome(),
                        loginRequest.getSenha()
                )
        );

        Usuario existingUser = usuarioService.findByUsername(loginRequest.getNome());

        if (existingUser == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        if (!existingUser.getSenha().equals(loginRequest.getSenha())) {
            return ResponseEntity.badRequest().body("Invalid password");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }
}
