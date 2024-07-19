package com.example.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {

    private static final String UPLOAD_DIR = "./uploads"; // Directorio donde se guardarán las imágenes

    public void saveImage(MultipartFile file, String username) throws IOException {
        java.nio.file.Path uploadPath = Paths.get(UPLOAD_DIR, username);
        Files.createDirectories(uploadPath);
        java.nio.file.Path filePath = uploadPath.resolve(file.getOriginalFilename());
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    }
}
