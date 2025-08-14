package com.sistema.taller.repository;

import com.sistema.taller.model.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProveedorRepository extends JpaRepository<Proveedor,Long> {

    Optional<Proveedor> findByNombre(String nombre);
}
