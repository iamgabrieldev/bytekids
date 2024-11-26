package com.utfpr.bytekids.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Aluno {

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
    private Workshop workshop;
}
