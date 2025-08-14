package com.sistema.taller.repository;

import com.sistema.taller.model.Reparacion;
import com.sistema.taller.model.Estado;
import com.sistema.taller.model.Orden;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReparacionRepository extends JpaRepository<Reparacion, Long> {
    List<Reparacion> findByEstado(Estado estado);
    List<Reparacion> findByEstadoIn(List<Estado> estados);
    Optional<Reparacion> findByOrden(Orden orden);


    Reparacion findByOrden_Id(Long ordenId);

}
