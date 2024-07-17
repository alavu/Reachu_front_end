package com.ReachU.ServiceBookingSystem;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
@OpenAPIDefinition(
		info = @Info(
				title = "ReachU Service Booking Microservice REST API Documentation",
				description = "Comprehensive API for booking a variety of urban services",
				version = "v1",
				contact = @Contact(
						name = "Alavudheen E",
						email = "alavu.engineer19@gmail.com",
						url = "https://alavudheen.vercel.app/"
				),
				license = @License(
						name = "Apache 2.0",
						url = "https://alavudheen.vercel.app/"
				)
		)
)
public class ServiceBookingSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceBookingSystemApplication.class, args);
	}

}
