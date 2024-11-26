package com.utfpr.bytekids.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Presenca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "codigo_aluno", referencedColumnName = "id", nullable = false)
    private Aluno aluno;

    @ManyToOne
    @JoinColumn(name = "codigo_workshop", referencedColumnName = "id", nullable = false)
    private Workshop workshop;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false, length = 10)
    private String status;
}

