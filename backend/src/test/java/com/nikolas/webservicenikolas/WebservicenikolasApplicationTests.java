package com.nikolas.webservicenikolas;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nikolas.webservicenikolas.model.Usuario;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.junit.Assert.*;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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

	@WithMockUser(authorities="read")
	@Test
	void getWhenReadAuthorityThenAuthorized() throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		String json = objectMapper.writeValueAsString(new Usuario("admin","13579"));

		this.mvc.perform(post("/auth/login")
						.contentType(MediaType.APPLICATION_JSON)
						.content(json))
				.andExpect(status().isOk());
	}

}
