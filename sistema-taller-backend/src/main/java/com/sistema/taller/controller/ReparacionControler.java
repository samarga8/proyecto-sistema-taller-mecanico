package com.sistema.taller.controller;

import com.sistema.taller.service.ReparacionServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.sistema.taller.model.dao.ReparacionDTO;

@RestController
@RequestMapping("/reparaciones")
public class ReparacionControler {

    @Autowired
    private ReparacionServiceImpl service;


    @GetMapping("/activas")
    public ResponseEntity<List<ReparacionDTO>> obtenerReparacionesActivas() {
        List<ReparacionDTO> reparaciones = service.obtenerReparacionesActivas();
        if (reparaciones.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(reparaciones);
    }

    @GetMapping("/completadas")
    public ResponseEntity<List<ReparacionDTO>> obtenerReparacionesCompletadas() {
        List<ReparacionDTO> reparaciones = service.obtenerReparacionesCompletadas();
        if (reparaciones.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(reparaciones);
    }
}
