package com.utfpr.bytekids.repository;

import com.utfpr.bytekids.model.Presenca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PresencaRepository extends JpaRepository<Presenca, Long> {

  @Query("SELECT COUNT(p) FROM Presenca p WHERE p.aluno.id = :alunoId AND p.workshop.id = :workshopId")
  int countByAlunoAndWorkshop(@Param("alunoId") Long alunoId, @Param("workshopId") Long workshopId);

}
