package com.nikolas.webservicenikolas.security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


@Service
public class CustomUserDetailsAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {


    @Autowired
    private CustomUserDetailsService userDetailsService;



    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken authentication) {
return;            // This method just returns without throwing any exceptions
    }

    @Override
    protected UserDetails retrieveUser(String username, UsernamePasswordAuthenticationToken authentication) {
        return userDetailsService.loadUserByUsername(username);
    }
}