package com.example.service;

import java.io.File;

import org.springframework.stereotype.Service;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;

@Service
public class OCRService {

    public String extractTextFromImage(File imageFile) {
        Tesseract tesseract = new Tesseract();
        tesseract.setDatapath("C:\\Program Files\\Tesseract-OCR\\tessdata");
        tesseract.setLanguage("spa");
        tesseract.setTessVariable("user_defined_dpi", "300");

        try {
            return tesseract.doOCR(imageFile);
        } catch (TesseractException e) {
            e.printStackTrace();
            return "Error extracting text";
        }
    }

//    public double extractAndCalculateTotal(File imageFile) {
//        String text = extractTextFromImage(imageFile);
//        return calculateTotal(text);
//    }
//
//    private double calculateTotal(String text) {
//        Pattern pattern = Pattern.compile("Total:\\s*(\\d+(?:\\.\\d+)?)");
//        Matcher matcher = pattern.matcher(text);
//        double total = 0.0;
//
//        while (matcher.find()) {
//            try {
//                total += Double.parseDouble(matcher.group(1));
//            } catch (NumberFormatException ignored) {
//            }
//        }
//
//        return total;
//    }


}
