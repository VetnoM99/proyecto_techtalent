package com.example.controller;

import java.io.IOException;
import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.service.ImageService;


@RestController
@RequestMapping("/images")
public class ImageController {

    private final ImageService imageService = new ImageService();

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file, Principal principal) {
        try {
            String username = principal.getName(); // Obtener el nombre de usuario del principal
            imageService.saveImage(file, username); // Guardar la imagen asociada al usuario
            return ResponseEntity.ok("Imagen subida exitosamente.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen.");
        }
    }
}