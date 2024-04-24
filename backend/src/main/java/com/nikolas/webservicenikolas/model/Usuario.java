package com.nikolas.webservicenikolas.model;

import com.nikolas.webservicenikolas.generic.classes.DefaultModel;
import com.nikolas.webservicenikolas.utils.Encrypter;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.checkerframework.common.aliasing.qual.Unique;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;


@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Usuario extends DefaultModel implements UserDetails {


    @Setter
    @NotNull
    @Unique
    private String nome;

    @NotNull
    @Column(nullable = false)
    private String senha;


    public void setSenha(String senha) {
        this.senha = Encrypter.encrypt(senha);
    }

    public String getSenha() {
        return Encrypter.decrypt(this.senha);
    }

    public String getHashedSenha() {
        return this.senha;
    }

    @Override
    public String getPassword() {
        return this.senha != null ? Encrypter.decrypt(this.senha) : null;
    }

    @Override
    public String getUsername() {
        return this.nome;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // For simplicity, let's assume all users have a single role "ROLE_USER"
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
    }
}
