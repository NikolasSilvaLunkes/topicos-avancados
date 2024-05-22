package com.nikolas.webservicenikolas;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nikolas.webservicenikolas.model.Usuario;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@AutoConfigureMockMvc
class WebservicenikolasApplicationTests {
	@Autowired
	private MockMvc mvc;

	@Test
	void contextLoads() {
	}

	@Test
	void PasswordEncoderTest() {
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

		// encode the password and store it in the database
		String rawPassword = "myPassword";
		String encodedPassword = encoder.encode(rawPassword);

		// check for a match
		boolean isMatch = encoder.matches(rawPassword, encodedPassword);

		assertTrue(isMatch);
	}

}
