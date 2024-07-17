package com.ReachU.ServiceBookingSystem.services.authentication;

import com.ReachU.ServiceBookingSystem.enums.EmailTemplateName;

public interface EmailService {

    void sendEmail(String to,
                   String username,
                   EmailTemplateName emailTemplate,
                   String confirmationUrl,
                   String activationCode,
                   String subject);
}
