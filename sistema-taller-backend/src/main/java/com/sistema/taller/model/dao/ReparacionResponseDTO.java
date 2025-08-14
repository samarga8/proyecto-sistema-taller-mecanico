package com.sistema.taller.model.dao;

import java.time.LocalDateTime;

public class ReparacionResponseDTO {
    private Long id;
    private String descripcion;
    private String tipoServicio;
    private String prioridad;
    private String estado;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaEstimadaFinalizacion;
    private String nombreCliente;
    private String nombreVehiculo;
    

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getTipoServicio() { return tipoServicio; }
    public void setTipoServicio(String tipoServicio) { this.tipoServicio = tipoServicio; }

    public String getPrioridad() { return prioridad; }
    public void setPrioridad(String prioridad) { this.prioridad = prioridad; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public LocalDateTime getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(LocalDateTime fechaInicio) { this.fechaInicio = fechaInicio; }

    public LocalDateTime getFechaEstimadaFinalizacion() { return fechaEstimadaFinalizacion; }
    public void setFechaEstimadaFinalizacion(LocalDateTime fechaEstimadaFinalizacion) { this.fechaEstimadaFinalizacion = fechaEstimadaFinalizacion; }

    public String getNombreCliente() { return nombreCliente; }
    public void setNombreCliente(String nombreCliente) { this.nombreCliente = nombreCliente; }

    public String getNombreVehiculo() { return nombreVehiculo; }
    public void setNombreVehiculo(String nombreVehiculo) { this.nombreVehiculo = nombreVehiculo; }
} 