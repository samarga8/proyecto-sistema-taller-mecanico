package com.sistema.taller.model.dao;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

import com.sistema.taller.model.Estado;

public class CitaDTO {
    private Long id;
    private Long clienteId;
    private Long vehiculoId;
    private Long empleadoId;
    private String cliente;
    private String vehiculo;
    private LocalDateTime fecha;
    private String hora;
    private String servicio;
    private String telefono;
    private Estado estado;
    private String descripcion;


    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
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
    public String getCliente() {
        return cliente;
    }
    public void setCliente(String cliente) {
        this.cliente = cliente;
    }
    public String getVehiculo() {
        return vehiculo;
    }
    public void setVehiculo(String vehiculo) {
        this.vehiculo = vehiculo;
    }
    
    public String getHora() {
        return hora;
    }
    public void setHora(String hora) {
        this.hora = hora;
    }
    public String getServicio() {
        return servicio;
    }
    public void setServicio(String servicio) {
        this.servicio = servicio;
    }
    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    public Estado getEstado() {
        return estado;
    }
    public void setEstado(Estado estado) {
        this.estado = estado;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public LocalDateTime getFecha() {
        return fecha;
    }
    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
    public Long getEmpleadoId() {
        return empleadoId;
    }
    public void setEmpleadoId(Long empleadoId) {
        this.empleadoId = empleadoId;
    }

    
}
