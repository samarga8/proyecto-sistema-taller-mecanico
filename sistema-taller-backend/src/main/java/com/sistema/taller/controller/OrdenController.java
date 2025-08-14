package com.sistema.taller.controller;

import com.sistema.taller.model.Orden;
import com.sistema.taller.model.dao.ActualizarEstadoOrdenDTO;
import com.sistema.taller.model.dao.EstadisticasOrdenesDTO;
import com.sistema.taller.model.dao.OrdenDetalleDTO;
import com.sistema.taller.model.dao.OrdenServicioDTO;
import com.sistema.taller.model.dao.OrdenTrabajoDTO;
import com.sistema.taller.service.OrdenServiceImpl;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ordenes")
@CrossOrigin("*")
@PreAuthorize("hasAnyRole('MECANICO', 'ADMINISTRADOR')")
public class OrdenController {

    @Autowired
    private OrdenServiceImpl ordenService;

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/crear")
    public ResponseEntity<Orden> crearOrden(@RequestBody OrdenServicioDTO dto) {
        Orden nuevaOrden = ordenService.crearOrden(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaOrden);
    }

 
    @GetMapping("/por-vehiculo/{vehiculoId}")
    public ResponseEntity<List<OrdenTrabajoDTO>> obtenerOrdenesPorVehiculo(@PathVariable Long vehiculoId) {
        return ResponseEntity.ok(ordenService.obtenerOrdenesPorVehiculo(vehiculoId));
    }

 
    @GetMapping("/listar")
    public ResponseEntity<List<OrdenTrabajoDTO>> listarOrdenes() {
        return ResponseEntity.ok(ordenService.listarOrdenes());
    }

   
    @GetMapping("/estadisticas")
    public ResponseEntity<EstadisticasOrdenesDTO> obtenerEstadisticasOrdenes() {
        return ResponseEntity.ok(ordenService.obtenerEstadisticas());
    }

  
    @GetMapping("/detalle/{ordenId}")
    public ResponseEntity<OrdenDetalleDTO> obtenerDetalleOrden(@PathVariable Long ordenId) {
        OrdenDetalleDTO dto = ordenService.obtenerDetalleOrden(ordenId);
        return ResponseEntity.ok(dto);
    }

   
    @PatchMapping("/trabajo/{ordenId}/estado")
    public ResponseEntity<OrdenTrabajoDTO> actualizarEstado(@PathVariable Long ordenId,
            @RequestBody ActualizarEstadoOrdenDTO dto) {
        return ResponseEntity.ok(ordenService.actualizarEstadoOrden(ordenId, dto));
    }

   
    @PatchMapping("/trabajo/{ordenId}/cancelar")
    public ResponseEntity<Void> cancelarOrden(@PathVariable Long ordenId,
            @RequestBody Map<String, String> payload) {
        ordenService.cancelarOrden(ordenId, payload.get("motivo"));
        return ResponseEntity.noContent().build();
    }

}
