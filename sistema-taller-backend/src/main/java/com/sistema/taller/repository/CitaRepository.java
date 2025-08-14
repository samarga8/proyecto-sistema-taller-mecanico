package com.sistema.taller.repository;

import com.sistema.taller.model.Cita;
import com.sistema.taller.model.Estado;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface CitaRepository extends JpaRepository<Cita,Long> {
    List<Cita> findAllByFechaBetween(LocalDate start, LocalDate end);
    List<Cita> findByFecha(LocalDateTime fecha);
    List<Cita> findByEstadoIn(List<Estado> estados);


}