package com.utfpr.bytekids.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Aluno {
    public Aluno() {
    }

    public Aluno(Long id, String nome, Workshop workshop) {
        this.id = id;
        this.nome = nome;
        this.workshop = workshop;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, unique = true, length = 20)
    private String documento;

    @Column(length = 15)
    private String telefone;

    @ManyToOne
    @JoinColumn(name = "codigo_workshop", referencedColumnName = "id")
    @JsonBackReference
    private Workshop workshop;
}
