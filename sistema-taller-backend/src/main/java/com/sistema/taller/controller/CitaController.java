package com.sistema.taller.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sistema.taller.model.Estado;
import com.sistema.taller.model.dao.CitaDTO;
import com.sistema.taller.model.dao.FiltrosCitasDTO;
import com.sistema.taller.model.dao.RespuestaCitasDTO;
import com.sistema.taller.service.CitaService;

@RestController
@RequestMapping("/citas")
public class CitaController {

    @Autowired
    private CitaService citaService;

    @GetMapping("/listar")
    public List<CitaDTO> listarCitas() {
        return citaService.listarCitas();
    }

    @PostMapping("/filtrar")
    public RespuestaCitasDTO obtenerCitasFiltradas(@RequestBody FiltrosCitasDTO filtros) {
        return citaService.obtenerCitasFiltradas(filtros);
    }

    @PostMapping("/crear")
    public ResponseEntity<CitaDTO> crearCita(@RequestBody CitaDTO citaDTO) {
        CitaDTO nuevaCita = citaService.crearCita(citaDTO);
        return ResponseEntity.status(201).body(nuevaCita); 
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<CitaDTO> actualizarCita(@PathVariable Long id, @RequestBody CitaDTO citaDTO) {
        CitaDTO citaActualizada = citaService.actualizarCita(id, citaDTO);
        return ResponseEntity.ok(citaActualizada); 
    }
    
    @PatchMapping("/estado/{id}")
    public ResponseEntity<CitaDTO> cambiarEstadoCita(@PathVariable Long id, @RequestBody Estado estado) {
        CitaDTO citaActualizada = citaService.cambiarEstadoCita(id, estado);
        return ResponseEntity.ok(citaActualizada); 
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Void> eliminarCita(@PathVariable Long id) {
        citaService.eliminarCita(id);
        return ResponseEntity.noContent().build(); 
    }
}
