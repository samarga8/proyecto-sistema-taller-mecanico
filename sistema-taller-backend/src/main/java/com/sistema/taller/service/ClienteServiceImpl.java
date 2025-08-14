package com.sistema.taller.service;

import com.sistema.taller.model.Cliente;
import com.sistema.taller.model.Factura;
import com.sistema.taller.model.Vehiculo;
import com.sistema.taller.model.dao.ClienteRegistroDTO;
import com.sistema.taller.model.dao.VehiculoResponseDTO;
import com.sistema.taller.repository.ClienteRepository;
import com.sistema.taller.repository.FacturaRepository;
import com.sistema.taller.repository.OrdenRepository;
import com.sistema.taller.repository.VehiculoRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteServiceImpl {

    @Autowired
    private ClienteRepository repoCliente;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private VehiculoRepository repoVehiculo;

    @Autowired
    private OrdenRepository ordenRepository;

    @Transactional
    public Cliente registrarCliente(ClienteRegistroDTO dto) throws Exception {
        Optional<Cliente> cliente = repoCliente.findFirstByDni(dto.getDni());
        if (cliente.isPresent()) {
            throw new IllegalArgumentException("El cliente con DNI " + dto.getDni() + " ya existe.");
        }

        Cliente nuevoCliente = new Cliente();
        nuevoCliente.setDni(dto.getDni());
        nuevoCliente.setNombreCompleto(dto.getNombreCompleto());
        nuevoCliente.setTelefono(dto.getTelefono());
        nuevoCliente.setEmail(dto.getEmail());
        nuevoCliente.setDireccion(dto.getDireccion());
        nuevoCliente.setFechaRegistro(LocalDate.now());

        repoCliente.save(nuevoCliente);

        return nuevoCliente;
    }


    public List<Cliente> listarClientes() {
        return repoCliente.findAll().stream().sorted(Comparator.comparing(Cliente::getNombreCompleto)).toList();
    }


    public Cliente obtenerCliente(String dni) throws Exception {
        Optional<Cliente> cliente = repoCliente.findFirstByDni(dni);
        if (cliente.isPresent()) {
            return cliente.get();
        } else {
            throw new Exception("El cliente no existe");
        }
    }



    public Cliente actualizarCliente(Cliente cliente) {
        // Validar existencia del cliente
        Cliente existente = repoCliente.findById(cliente.getId())
            .orElseThrow(() -> new EntityNotFoundException("Cliente no encontrado con ID " + cliente.getId()));
    
        // Validar email y dni únicos
        if (repoCliente.existsByEmailAndIdNot(cliente.getEmail(), cliente.getId())) {
            throw new IllegalArgumentException("El email ya está en uso por otro cliente.");
        }
    
        if (repoCliente.existsByDniAndIdNot(cliente.getDni(), cliente.getId())) {
            throw new IllegalArgumentException("El DNI ya está en uso por otro cliente.");
        }
    
        // Actualizar y guardar
        return repoCliente.save(existente);
    }
    


    @Transactional
    public void eliminarCliente(Long id) {
        Cliente cliente = repoCliente.findById(id).orElse(null);
        if (cliente == null) return;
    
        // Verifica si algún vehículo tiene órdenes asociadas
        for (Vehiculo v : cliente.getVehiculos()) {
            if (ordenRepository.existsByVehiculoId(v.getId())) {
                throw new IllegalStateException("No se puede eliminar el cliente porque uno de sus vehículos tiene órdenes asociadas.");
            }
        }
    
        repoCliente.deleteById(id);
    }


    public Cliente findById(long id) {
        Optional<Cliente> cliente = repoCliente.findById(id);
        return cliente.orElse(null);
    }

    public List<VehiculoResponseDTO> obtenerVehiculosPorCliente(long clienteId) {
        List<Vehiculo> vehiculos = repoVehiculo.findByClienteId(clienteId);
        List<VehiculoResponseDTO> dtos = new ArrayList<>();
        for (Vehiculo vehiculo : vehiculos) {
            dtos.add(mapper.map(vehiculo, VehiculoResponseDTO.class));
        }
        return dtos;
    }
}
