package com.nikolas.webservicenikolas;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.junit.Assert.*;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class WebservicenikolasApplicationTests {

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
