package com.example.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entities.Registro;
import com.example.service.RegistroService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/registros")
@RequiredArgsConstructor
public class RegistroController {

    private final RegistroService registroService;

    @GetMapping
    public ResponseEntity<List<Registro>> getAllRegistros() {
        List<Registro> registros = registroService.getAllRegistros();
        return ResponseEntity.ok(registros);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Registro> getRegistroById(@PathVariable Long id) {
        Optional<Registro> registro = registroService.getRegistroById(id);
        return registro.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Registro> createRegistro(@RequestBody Registro registro) {
        Registro createdRegistro = registroService.createRegistro(registro);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRegistro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Registro> updateRegistro(@PathVariable Long id, @RequestBody Registro registro) {
        if (!registroService.getRegistroById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        registro.setId(id); // Asegura que el ID del registro coincida con el proporcionado en la URL
        Registro updatedRegistro = registroService.updateRegistro(registro);
        return ResponseEntity.ok(updatedRegistro);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRegistro(@PathVariable Long id) {
        if (!registroService.getRegistroById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        registroService.deleteRegistro(id);
        return ResponseEntity.noContent().build();
    }
}
