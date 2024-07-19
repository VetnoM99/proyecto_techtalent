package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.entities.Registro;
import com.example.repository.RegistroRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegistroService {

    private final RegistroRepository registroRepository;

    public List<Registro> getAllRegistros() {
        return registroRepository.findAll();
    }

    public Optional<Registro> getRegistroById(Long id) {
        return registroRepository.findById(id);
    }

    public Registro createRegistro(Registro registro) {
        return registroRepository.save(registro);
    }

    public Registro updateRegistro(Registro registro) {
        return registroRepository.save(registro);
    }

    public void deleteRegistro(Long id) {
        registroRepository.deleteById(id);
    }
}
