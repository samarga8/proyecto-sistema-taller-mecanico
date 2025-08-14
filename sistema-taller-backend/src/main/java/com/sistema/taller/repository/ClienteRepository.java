package com.sistema.taller.repository;

import com.sistema.taller.model.Cliente;
import com.sistema.taller.model.Factura;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;

public interface ClienteRepository extends JpaRepository<Cliente,Long> {
    Optional<Cliente> findFirstByDni(String dni);
    Set<Cliente> findAllByFacturas(Factura factura);
    boolean existsByEmailAndIdNot(String email, Long id);
    boolean existsByDniAndIdNot(String dni, Long id);


}