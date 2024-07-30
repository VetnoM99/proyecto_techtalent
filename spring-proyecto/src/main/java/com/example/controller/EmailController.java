package com.example.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.DTO.ContactMessageDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@RestController
public class EmailController {

    @Autowired
    private JavaMailSender emailSender;

    @PostMapping("/sendEmail")
    public String sendEmail(@RequestBody ContactMessageDTO emailMessage) {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            helper.setFrom("proyecto.techtalent@gmail.com");
            helper.setTo("proyecto.techtalent@gmail.com");
            helper.setSubject("Nuevo Contacto");
            helper.setText("Nombre: " + emailMessage.getName() + "\nCorreo: " + emailMessage.getEmail() + "\nComentario: " + emailMessage.getComment());
            emailSender.send(message);
            return "Email enviado correctamente.";
        } catch (MessagingException e) {
            e.printStackTrace();
            return "Error al enviar el email: " + e.getMessage();
        }
    }
}
