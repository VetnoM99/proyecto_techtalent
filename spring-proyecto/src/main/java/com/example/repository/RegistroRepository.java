package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.entities.Registro;

@Repository
public interface RegistroRepository extends JpaRepository<Registro, Long>{


}
