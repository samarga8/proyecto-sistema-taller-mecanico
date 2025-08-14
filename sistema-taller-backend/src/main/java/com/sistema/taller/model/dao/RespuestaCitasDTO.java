package com.sistema.taller.model.dao;

import java.util.List;

public class RespuestaCitasDTO {
    private List<CitaDTO> citas;
    private Long total;
    public RespuestaCitasDTO(List<CitaDTO> citaDTOs, long size) {
        //TODO Auto-generated constructor stub
    }
    public List<CitaDTO> getCitas() {
        return citas;
    }
    public void setCitas(List<CitaDTO> citas) {
        this.citas = citas;
    }
    public Long getTotal() {
        return total;
    }
    public void setTotal(Long total) {
        this.total = total;
    }

    
}
