package com.ReachU.ServiceBookingSystem.controller;

import com.ReachU.ServiceBookingSystem.entity.CheckoutPayment;
import com.ReachU.ServiceBookingSystem.services.stripe.StripeService;
import com.stripe.Stripe;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;

import java.util.Collections;

@RestController
@RequestMapping("/api")
public class StripeController {

    private final StripeService stripeService;

    public StripeController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/payment")
    public ResponseEntity<?> createPayment(@RequestBody CheckoutPayment payment) {
        try {
            Session session = stripeService.createSession(
                    payment.getSuccessUrl(),
                    payment.getCancelUrl(),
                    payment.getAmount(),
                    payment.getCurrency()
            );
            return ResponseEntity.ok(Collections.singletonMap("id", session.getId())); // Wrap ID in a JSON object
        } catch (StripeException e) {
            System.err.println("Error creating Stripe session: " + e.getMessage());
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage())); // Wrap the error in JSON
        }
    }
}