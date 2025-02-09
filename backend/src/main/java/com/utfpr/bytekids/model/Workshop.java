package com.utfpr.bytekids.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Workshop {

    public Workshop() {
    }

    public Workshop(Long id, String turma) {
        this.id = id;
        this.turma = turma;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, length = 50)
    private String turma;

    @ManyToOne
    @JoinColumn(name = "codigo_professor", referencedColumnName = "id")
    private Professor professor;

    @OneToMany(mappedBy = "workshop")
    @JsonManagedReference
    private List<Aluno> alunos; // Lista de alunos no workshop
}
