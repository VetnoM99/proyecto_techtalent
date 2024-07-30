package com.example.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.service.OCRService;

@RestController
@RequestMapping("/ocr")
public class OCRController {

    @Autowired
    private OCRService ocrService;

    @PostMapping("/extract")
    public String extractText(@RequestParam("file") MultipartFile file) {
        try {
            File convFile = new File(System.getProperty("java.io.tmpdir") + "/" + file.getOriginalFilename());
            file.transferTo(convFile);
            return ocrService.extractTextFromImage(convFile);
        } catch (IOException e) {
            e.printStackTrace();
            return "Error processing file";
        }
    }

//    @PostMapping("/total")
//    public ResponseEntity<Map<String, Double>> extractAndCalculateTotal(@RequestParam("file") MultipartFile file) {
//        Map<String, Double> response = new HashMap<>();
//        try {
//            File convFile = new File(System.getProperty("java.io.tmpdir") + "/" + file.getOriginalFilename());
//            file.transferTo(convFile);
//            double total = ocrService.extractAndCalculateTotal(convFile);
//            response.put("total", total);
//            return ResponseEntity.ok(response);
//        } catch (IOException e) {
//            e.printStackTrace();
//            response.put("total", 0.0);
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//        }
//    }

    }

