package com.ReachU.ServiceBookingSystem.services.stripe;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class StripeService {

    @Value("${Stripe.apiKey}")
    private String stripeSecretKey;

    @PostConstruct
    private void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    public Session createSession(String successUrl, String cancelUrl, long amount, String currency) throws StripeException {
        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(successUrl)
                .setCancelUrl(cancelUrl)
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency(currency)
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName("Service Payment")
                                                                .build())
                                                .setUnitAmount(amount)
                                                .build())
                                .setQuantity(1L)
                                .build())
                .build();

        return Session.create(params);
    }
}