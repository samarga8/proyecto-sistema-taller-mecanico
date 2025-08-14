package com.sistema.taller.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.sistema.taller.model.Cita;
import com.sistema.taller.model.Empleado;
import com.sistema.taller.model.Estado;
import com.sistema.taller.model.Cliente;
import com.sistema.taller.model.Vehiculo;
import com.sistema.taller.model.dao.CitaDTO;
import com.sistema.taller.model.dao.FiltrosCitasDTO;
import com.sistema.taller.model.dao.RespuestaCitasDTO;
import com.sistema.taller.repository.CitaRepository;
import com.sistema.taller.repository.ClienteRepository;
import com.sistema.taller.repository.EmpleadoRepository;
import com.sistema.taller.repository.VehiculoRepository;
import com.sistema.taller.utils.ModelMapperConfig;

public class CitaService {
    @Autowired
    private CitaRepository citaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private ModelMapper mapper;

    public List<CitaDTO> listarCitas() {
        List<Cita> citas = citaRepository.findAll();
        return citas.stream()
        .map(cita -> mapper.map(cita, CitaDTO.class))  
        .collect(Collectors.toList());
    }

    public RespuestaCitasDTO obtenerCitasFiltradas(FiltrosCitasDTO filtros) {
        List<Cita> citas;
    
        // Filtrado según el estado
        if (filtros.getEstado() != null && !filtros.getEstado().isEmpty()) {
            citas = citaRepository.findByEstadoIn(filtros.getEstado());
        }
        // Filtrado por fecha
        else if (filtros.getFecha() != null) {
            citas = citaRepository.findByFecha(filtros.getFecha());
        }
        // Si no hay filtros, se obtienen todas las citas
        else {
            citas = citaRepository.findAll();
        }
    
        // Convertir la lista de Cita a CitaDTO usando ModelMapper
        List<CitaDTO> citaDTOs = citas.stream()
                .map(cita -> mapper.map(cita, CitaDTO.class))
                .collect(Collectors.toList());
    
        // Retornar la respuesta con la lista de citas y el total
        return new RespuestaCitasDTO(citaDTOs, (long) citas.size());
    }
    

    public CitaDTO crearCita(CitaDTO citaDTO) {
        Cita cita = new Cita();
        
        // Mapeo de datos
        Optional<Cliente> cliente = clienteRepository.findById(citaDTO.getClienteId());
        Optional<Vehiculo> vehiculo = vehiculoRepository.findById(citaDTO.getVehiculoId());
        Optional<Empleado> empleado = empleadoRepository.findById(citaDTO.getEmpleadoId());

        if (!cliente.isPresent() || !vehiculo.isPresent() || !empleado.isPresent()) {
            throw new RuntimeException("Cliente, Vehículo o Empleado no encontrado");
        }

        cita.setCliente(cliente.get());
        cita.setVehiculo(vehiculo.get());
        cita.setEmpleado(empleado.get());
        cita.setEstado(citaDTO.getEstado());
        cita.setFecha(citaDTO.getFecha());
        cita.setDescripcion(citaDTO.getDescripcion());

        cita = citaRepository.save(cita);

        return convertirACitaDTO(cita);
    }

    public CitaDTO actualizarCita(Long id, CitaDTO citaDTO) {
        Optional<Cita> optionalCita = citaRepository.findById(id);
        if (optionalCita.isPresent()) {
            Cita cita = optionalCita.get();

            // Actualizamos los campos
            cita.setEstado(citaDTO.getEstado());
            cita.setFecha(citaDTO.getFecha());
            cita.setDescripcion(citaDTO.getDescripcion());

            Optional<Cliente> cliente = clienteRepository.findById(citaDTO.getClienteId());
            Optional<Vehiculo> vehiculo = vehiculoRepository.findById(citaDTO.getVehiculoId());
            Optional<Empleado> empleado = empleadoRepository.findById(citaDTO.getEmpleadoId());

            if (cliente.isPresent()) cita.setCliente(cliente.get());
            if (vehiculo.isPresent()) cita.setVehiculo(vehiculo.get());
            if (empleado.isPresent()) cita.setEmpleado(empleado.get());

            cita = citaRepository.save(cita);
            return convertirACitaDTO(cita);
        }
        throw new RuntimeException("Cita no encontrada");
    }

    public CitaDTO cambiarEstadoCita(Long id, Estado estado) {
        Optional<Cita> optionalCita = citaRepository.findById(id);
        if (optionalCita.isPresent()) {
            Cita cita = optionalCita.get();
            cita.setEstado(estado);
            cita = citaRepository.save(cita);
            return convertirACitaDTO(cita);
        }
        throw new RuntimeException("Cita no encontrada");
    }

    public void eliminarCita(Long id) {
        citaRepository.deleteById(id);
    }

    private CitaDTO convertirACitaDTO(Cita cita) {
        CitaDTO citaDTO = new CitaDTO();
        citaDTO.setId(cita.getId());
        citaDTO.setFecha(cita.getFecha()); 
        citaDTO.setDescripcion(cita.getDescripcion());
        citaDTO.setEstado(cita.getEstado());
        citaDTO.setClienteId(cita.getCliente().getId());
        citaDTO.setVehiculoId(cita.getVehiculo().getId());
        citaDTO.setEmpleadoId(cita.getEmpleado().getId());

        return citaDTO;
    }
}
