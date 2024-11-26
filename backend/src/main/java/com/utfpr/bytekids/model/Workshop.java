package com.utfpr.bytekids.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Workshop {

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
    private List<Aluno> alunos; // Lista de alunos no workshop
}
