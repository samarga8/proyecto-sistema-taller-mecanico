import axios from "axios";
import baseUrl from "./helper";
import { CitaDTO, FiltrosCitasDTO, RespuestaCitasDTO, EstadoCita } from "../models/CitaDTO";

// Función para obtener todas las citas
export const listarCitas = async (): Promise<CitaDTO[]> => {
  try {
    const response = await axios.get(`${baseUrl}/citas/listar`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al obtener la lista de citas');
  }
};

// Función para obtener citas filtradas
export const obtenerCitasFiltradas = async (filtros: FiltrosCitasDTO): Promise<RespuestaCitasDTO> => {
  try {
    const response = await axios.post(`${baseUrl}/citas/filtrar`, filtros);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al filtrar las citas');
  }
};

// Función para crear una nueva cita
export const crearCita = async (citaData: Omit<CitaDTO, 'id'>): Promise<CitaDTO> => {
  try {
    const response = await axios.post(`${baseUrl}/citas/crear`, citaData);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al crear la cita');
  }
};

// Función para actualizar una cita
export const actualizarCita = async (id: number, citaData: Partial<CitaDTO>): Promise<CitaDTO> => {
  try {
    const response = await axios.put(`${baseUrl}/citas/actualizar/${id}`, citaData);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al actualizar la cita');
  }
};

// Función para cambiar el estado de una cita
export const cambiarEstadoCita = async (id: number, estado: EstadoCita): Promise<CitaDTO> => {
  try {
    const response = await axios.patch(`${baseUrl}/citas/estado/${id}`, { estado });
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al cambiar el estado de la cita');
  }
};

// Función para eliminar una cita
export const eliminarCita = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${baseUrl}/citas/eliminar/${id}`);
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al eliminar la cita');
  }
};

// Función para obtener citas por cliente
export const obtenerCitasPorCliente = async (clienteId: number): Promise<CitaDTO[]> => {
  try {
    const response = await axios.get(`${baseUrl}/citas/cliente/${clienteId}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al obtener las citas del cliente');
  }
};

// Función para obtener citas por vehículo
export const obtenerCitasPorVehiculo = async (vehiculoId: number): Promise<CitaDTO[]> => {
  try {
    const response = await axios.get(`${baseUrl}/citas/vehiculo/${vehiculoId}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al obtener las citas del vehículo');
  }
};

// Función para obtener citas por fecha
export const obtenerCitasPorFecha = async (fecha: string): Promise<CitaDTO[]> => {
  try {
    const response = await axios.get(`${baseUrl}/citas/fecha/${fecha}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error('Error al obtener las citas para la fecha especificada');
  }
};