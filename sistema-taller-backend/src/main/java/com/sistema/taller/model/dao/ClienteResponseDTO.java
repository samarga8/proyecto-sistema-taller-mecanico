package com.sistema.taller.model.dao;


import java.time.LocalDate;
import java.util.List;

public class ClienteResponseDTO {

    private long id;

    private String dni;

    private String nombreCompleto;


    private String direccion;

    private String telefono;

    private String email;

    private LocalDate ultimaVisita;

    private List<VehiculoResponseDTO> vehiculos;

 
    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNombreCompleto() {
        return nombreCompleto;
    }

    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public LocalDate getUltimaVisita() {
        return ultimaVisita;
    }

    public void setUltimaVisita(LocalDate ultimaVisita) {
        this.ultimaVisita = ultimaVisita;
    }

    public List<VehiculoResponseDTO> getVehiculos() {
        return vehiculos;
    }

    public void setVehiculos(List<VehiculoResponseDTO> vehiculos) {
        this.vehiculos = vehiculos;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }



    
}
