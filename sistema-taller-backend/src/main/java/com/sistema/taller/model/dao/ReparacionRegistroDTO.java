package com.sistema.taller.model.dao;

import com.sistema.taller.model.Cliente;
import com.sistema.taller.model.Vehiculo;
import java.time.LocalDateTime;

public class ReparacionRegistroDTO {
    private Long id;
    private Vehiculo vehiculo;
    private Cliente cliente;
    private String tipoServicio;
    private String descripcion;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaEstimadaFin;
    private Integer kilometraje;
    private Long tecnicoAsignadoId;
    private String prioridad;
    private Boolean notificarCliente;
    private String estado;
    private Integer progreso;

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Vehiculo getVehiculo() { return vehiculo; }
    public void setVehiculo(Vehiculo vehiculo) { this.vehiculo = vehiculo; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public String getTipoServicio() { return tipoServicio; }
    public void setTipoServicio(String tipoServicio) { this.tipoServicio = tipoServicio; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public LocalDateTime getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(LocalDateTime fechaInicio) { this.fechaInicio = fechaInicio; }

    public LocalDateTime getFechaEstimadaFin() { return fechaEstimadaFin; }
    public void setFechaEstimadaFin(LocalDateTime fechaEstimadaFin) { this.fechaEstimadaFin = fechaEstimadaFin; }

    public Integer getKilometraje() { return kilometraje; }
    public void setKilometraje(Integer kilometraje) { this.kilometraje = kilometraje; }

    public Long getTecnicoAsignadoId() { return tecnicoAsignadoId; }
    public void setTecnicoAsignadoId(Long tecnicoAsignadoId) { this.tecnicoAsignadoId = tecnicoAsignadoId; }

    public String getPrioridad() { return prioridad; }
    public void setPrioridad(String prioridad) { this.prioridad = prioridad; }

    public Boolean getNotificarCliente() { return notificarCliente; }
    public void setNotificarCliente(Boolean notificarCliente) { this.notificarCliente = notificarCliente; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public Integer getProgreso() { return progreso; }
    public void setProgreso(Integer progreso) { this.progreso = progreso; }
}
