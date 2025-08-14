package com.sistema.taller.service;

import com.sistema.taller.model.Cliente;
import com.sistema.taller.model.Vehiculo;
import com.sistema.taller.model.Estado;
import com.sistema.taller.model.Orden;
import com.sistema.taller.model.Reparacion;
import com.sistema.taller.model.dao.ClienteSimpleDTO;
import com.sistema.taller.model.dao.ReparacionDTO;
import com.sistema.taller.model.dao.VehiculoResponseDTO;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import com.sistema.taller.repository.ReparacionRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReparacionServiceImpl {
    @Autowired
    private ReparacionRepository reparacionRepository;

    @Autowired
    private ModelMapper modelMapper;

       
    public List<ReparacionDTO> obtenerReparacionesActivas() {
        // Buscar reparaciones que tengan estado PENDIENTE o EN_CURSO
        List<Reparacion> reparaciones = reparacionRepository.findByEstadoIn(Arrays.asList(Estado.PENDIENTE, Estado.EN_CURSO));

        // Lista para almacenar los DTOs
        List<ReparacionDTO> reparacionesDTO = new ArrayList<>();

        // Mapeo de cada reparación a su DTO correspondiente
        for (Reparacion reparacion : reparaciones) {
            // Mapeo básico de la reparación a DTO
            ReparacionDTO reparacionDTO = modelMapper.map(reparacion, ReparacionDTO.class);

            // Mapear el cliente desde la entidad 'Reparacion'
            Cliente cliente = reparacion.getCliente();
            ClienteSimpleDTO clienteDTO = modelMapper.map(cliente, ClienteSimpleDTO.class);
      

            // Mapear el vehículo desde la relación 'orden' (reparacion -> orden -> vehiculo)
            Vehiculo vehiculo = reparacion.getOrden().getVehiculo();
            VehiculoResponseDTO vehiculoDTO = modelMapper.map(vehiculo, VehiculoResponseDTO.class);
            vehiculoDTO.setCliente(clienteDTO);
            reparacionDTO.setVehiculo(vehiculoDTO);

            
            reparacionesDTO.add(reparacionDTO);
        }

        return reparacionesDTO;
    }
    

    public List<ReparacionDTO> obtenerReparacionesCompletadas() {
        // Obtenemos todas las reparaciones con estado FINALIZADO
        List<Reparacion> reparacionesCompletadas = reparacionRepository.findByEstado(Estado.COMPLEATADA);
        
        // Lista para almacenar los DTOs
        List<ReparacionDTO> reparacionesDTO = new ArrayList<>();
        
        // Mapeamos las reparaciones a su DTO correspondiente
        for (Reparacion reparacion : reparacionesCompletadas) {
            ReparacionDTO reparacionDTO = modelMapper.map(reparacion, ReparacionDTO.class);
            
            // Mapear el cliente desde la entidad 'Reparacion'
            Cliente cliente = reparacion.getCliente();
            ClienteSimpleDTO clienteDTO = modelMapper.map(cliente, ClienteSimpleDTO.class);
         

            // Mapear el vehículo desde la relación 'orden' (reparacion -> orden -> vehiculo)
            Vehiculo vehiculo = reparacion.getOrden().getVehiculo();
            VehiculoResponseDTO vehiculoDTO = modelMapper.map(vehiculo, VehiculoResponseDTO.class);
            vehiculoDTO.setCliente(clienteDTO);  // Establecer la relación inversa
            reparacionDTO.setVehiculo(vehiculoDTO);

            // Agregar el DTO de la reparación a la lista
            reparacionesDTO.add(reparacionDTO);
        }

        // Retornar la lista de reparaciones completadas como DTOs
        return reparacionesDTO;
    }


    
}
