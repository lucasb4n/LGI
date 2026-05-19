package com.lgi.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendRecoveryCode(String to, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("suporte@lgi.com");
        message.setTo(to);
        message.setSubject("Código de Recuperação de Senha");
        message.setText("Seu código de recuperação é: " + code + "\nO código expira em 10 minutos.");
        
        try {
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Erro ao enviar email: " + e.getMessage());
            // Em produção, tratar melhor o erro. Aqui apenas logamos para não travar o fluxo se o SMTP não estiver configurado.
        }
    }
}
