package com.utfpr.bytekids.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PresencaDTO {
  private Long alunoId;
  private Long workshopId;
  private String status;
}
