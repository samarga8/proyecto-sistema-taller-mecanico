import axios from "axios";
import baseUrl from "./helper";
import { IEmpleado } from "@/models/IEmpleado";

// Función para obtener un empleado por ID
export const obtenerEmpleadoPorId = async (id: number): Promise<IEmpleado> => {
  try {
    const response = await axios.get(`${baseUrl}/empleados/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      throw new Error('Empleado no encontrado');
    }
    throw new Error('Error al obtener el empleado');
  }
};

// Función simple para obtener todos los empleados
export const obtenerTodosLosEmpleados = async (): Promise<IEmpleado[]> => {
  try {
    const response = await axios.get(`${baseUrl}/empleados`);
    return response.data;
  } catch (error: any) {
    throw new Error('Error al obtener la lista de empleados');
  }
};

// Función para obtener empleados por cargo
export const obtenerEmpleadosPorCargo = async (cargo: string): Promise<IEmpleado[]> => {
  try {
    const response = await axios.get(`${baseUrl}/empleados/cargo/${cargo}`);
    return response.data;
  } catch (error: any) {
    throw new Error('Error al obtener los empleados por cargo');
  }
};

// Función para obtener técnicos (empleados con cargo de técnico/mecánico)
export const obtenerTecnicos = async (): Promise<IEmpleado[]> => {
  try {
    const response = await axios.get(`${baseUrl}/empleados/tecnicos`);
    return response.data;
  } catch (error: any) {
    throw new Error('Error al obtener la lista de técnicos');
  }
};