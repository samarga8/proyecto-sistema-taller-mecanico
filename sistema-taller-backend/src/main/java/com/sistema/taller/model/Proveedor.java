package com.sistema.taller.model;

import jakarta.persistence.*;
import java.time.ZonedDateTime;

@Entity
public class Proveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    private String contacto;
    private String direccion;
    private String telefono;
    private String email;

    @Column(name = "fecha_registro")
    private ZonedDateTime fechaRegistro = ZonedDateTime.now();

    // Getters y setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getContacto() { return contacto; }
    public void setContacto(String contacto) { this.contacto = contacto; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { this.telefono = telefono; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public ZonedDateTime getFechaRegistro() { return fechaRegistro; }
    public void setFechaRegistro(ZonedDateTime fechaRegistro) { this.fechaRegistro = fechaRegistro; }
}
