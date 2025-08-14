package com.sistema.taller.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
public class Reparacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "El estado es obligatorio")
    private Estado estado;

    @NotBlank(message = "La descripción es obligatoria")
    @Column(length = 500)
    private String descripcion;

    @Column(length = 1000)
    private String diagnostico;

  
    
    @Column(length = 500)
    private String observaciones;
    
    
    
    @Column(length = 100)
    private String tipoServicio;
    
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaEstimadaFinalizacion;
    
    @Enumerated(EnumType.STRING)
    private PrioridadReparacion prioridad;

   
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orden_id", nullable = false, unique = true)
    @JsonProperty(access = Access.WRITE_ONLY)
    private Orden orden;

    // Constructores
    public Reparacion() {
        this.estado = Estado.PENDIENTE;
        this.fechaInicio = LocalDateTime.now();
    }

    public Reparacion(Orden orden, String descripcion) {
        this();
        this.orden = orden;
        this.descripcion = descripcion;
    }

    // Métodos de conveniencia para acceder a datos de la orden
    public Cliente getCliente() {
        return orden != null ? orden.getVehiculo().getCliente() : null;
    }


 
    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getDiagnostico() {
        return diagnostico;
    }

    public void setDiagnostico(String diagnostico) {
        this.diagnostico = diagnostico;
    }



    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }


    public String getTipoServicio() {
        return tipoServicio;
    }

    public void setTipoServicio(String tipoServicio) {
        this.tipoServicio = tipoServicio;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDateTime getFechaEstimadaFinalizacion() {
        return fechaEstimadaFinalizacion;
    }

    public void setFechaEstimadaFinalizacion(LocalDateTime fechaEstimadaFinalizacion) {
        this.fechaEstimadaFinalizacion = fechaEstimadaFinalizacion;
    }

    public PrioridadReparacion getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(PrioridadReparacion prioridad) {
        this.prioridad = prioridad;
    }

    public Orden getOrden() {
        return orden;
    }

    public void setOrden(Orden orden) {
        this.orden = orden;
    }
}