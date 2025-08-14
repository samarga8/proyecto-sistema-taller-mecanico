package com.sistema.taller.model.dao;

import java.time.LocalDateTime;
import java.util.List;

import com.sistema.taller.model.Estado;

public class FiltrosCitasDTO {
    private LocalDateTime fecha;
    private Long clienteId;
    private Long vehiculoId;
    private List<Estado> estado;
    private String busqueda;


   
    public Long getClienteId() {
        return clienteId;
    }
    public void setClienteId(Long clienteId) {
        this.clienteId = clienteId;
    }
    public Long getVehiculoId() {
        return vehiculoId;
    }
    public void setVehiculoId(Long vehiculoId) {
        this.vehiculoId = vehiculoId;
    }
    public List<Estado> getEstado() {
        return estado;
    }
    public void setEstado(List<Estado> estado) {
        this.estado = estado;
    }
    public String getBusqueda() {
        return busqueda;
    }
    public void setBusqueda(String busqueda) {
        this.busqueda = busqueda;
    }
    public LocalDateTime getFecha() {
        return fecha;
    }
    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    
}
