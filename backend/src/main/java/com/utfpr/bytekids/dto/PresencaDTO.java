package com.utfpr.bytekids.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PresencaDTO {

  public PresencaDTO(Long alunoId, Long workshopId, String status) {
    this.alunoId = alunoId;
    this.workshopId = workshopId;
    this.status = status;
  }

  private Long alunoId;
  private Long workshopId;
  private String status;
}
