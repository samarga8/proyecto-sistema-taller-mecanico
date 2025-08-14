package com.sistema.taller.controller;


import com.sistema.taller.model.Cliente;
import com.sistema.taller.model.dao.ClienteRegistroDTO;
import com.sistema.taller.model.dao.ClienteResponseDTO;
import com.sistema.taller.model.dao.VehiculoResponseDTO;

import com.sistema.taller.model.dao.ClienteSimpleDTO;
import com.sistema.taller.repository.FacturaRepository;
import com.sistema.taller.repository.VehiculoRepository;
import com.sistema.taller.service.ClienteServiceImpl;
import com.sistema.taller.service.FacturaServiceImpl;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/clientes")
@CrossOrigin("*")
public class ClienteController {

    @Autowired
    private ClienteServiceImpl service;

    private static final Logger logger = LoggerFactory.getLogger(ClienteController.class);

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PostMapping("/nuevoCliente")
    public ResponseEntity<?> guardarNuevaPersona( @RequestBody ClienteRegistroDTO dto) {

        try {
            Cliente clienteGuardado = service.registrarCliente(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(clienteGuardado);
        } catch (IllegalArgumentException e) {
            // Cliente duplicado
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            // Error inesperado
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al guardar el cliente."));
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ClienteResponseDTO>> listarClientes() {
        List<Cliente> lista = service.listarClientes();
        List<ClienteResponseDTO> listaDTO = lista.stream().map(cliente -> {
            ClienteResponseDTO dto = new ClienteResponseDTO();
            dto.setId(cliente.getId());
            dto.setDni(cliente.getDni());
            dto.setNombreCompleto(cliente.getNombreCompleto());
            dto.setDireccion(cliente.getDireccion());
            dto.setTelefono(cliente.getTelefono());
            dto.setEmail(cliente.getEmail());
            // Mapear vehículos a VehiculoDTO
            List<VehiculoResponseDTO> vehiculosDTO = cliente.getVehiculos().stream().map(vehiculo -> {
                VehiculoResponseDTO vdto = new VehiculoResponseDTO();
                vdto.setId(vehiculo.getId());
                vdto.setMarca(vehiculo.getMarca());
                vdto.setModelo(vehiculo.getModelo());
                vdto.setMatricula(vehiculo.getMatricula());
                vdto.setAnio(vehiculo.getAnio());
                vdto.setKilometraje(vehiculo.getKilometraje());
                vdto.setColor(vehiculo.getColor());
                
                // Mapear cliente simple
                ClienteSimpleDTO csdto = new ClienteSimpleDTO();
                csdto.setDni(cliente.getDni());
                csdto.setNombreCompleto(cliente.getNombreCompleto());
                vdto.setCliente(csdto);
                return vdto;
            }).toList();
            dto.setVehiculos(vehiculosDTO);
            return dto;
        }).toList();
        return new ResponseEntity<>(listaDTO,HttpStatus.OK);
    }


    
    @GetMapping("/obtener/{dni}")
    public ResponseEntity<Cliente> obtenerCliente(@PathVariable String dni) {

        try {
            return new ResponseEntity<>(service.obtenerCliente(dni),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    @GetMapping("/obtenerCliente/{id}")
    public ResponseEntity<Cliente> obtenerClientePorId(@PathVariable long id) {

        try {
            return new ResponseEntity<>(service.findById(id),HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    
    @GetMapping("/{clienteId}/vehiculos")
    public List<VehiculoResponseDTO> getVehiculosPorCliente(@PathVariable long clienteId) {
        return service.obtenerVehiculosPorCliente(clienteId);
    }

    @PreAuthorize("hasRole('ADMINISTRADOR')")
    @PutMapping("/editarCliente/{id}")
    public ResponseEntity<?> actualizarCliente(@PathVariable long id, @RequestBody Cliente cliente) {
        logger.info("Datos recibidos del frontend: {}", cliente);
       
        try {
            Cliente clienteExiste = service.findById(id);
            clienteExiste.setId(id);
            clienteExiste.setDni(cliente.getDni());
            clienteExiste.setNombreCompleto(cliente.getNombreCompleto());
    
            clienteExiste.setEmail(cliente.getEmail());
            clienteExiste.setDireccion(cliente.getDireccion());
            clienteExiste.setTelefono(cliente.getTelefono());

            Cliente clienteActualizado = service.actualizarCliente(clienteExiste);
            return ResponseEntity.ok(clienteActualizado);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al actualizar el cliente: " + e.getMessage()));
        }
    }


    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarCliente(@PathVariable long id) {
        try {
            service.eliminarCliente(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Error al eliminar el cliente: " + e.getMessage()));
        }
    }

}