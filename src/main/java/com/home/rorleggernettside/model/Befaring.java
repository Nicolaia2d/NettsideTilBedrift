package com.home.rorleggernettside.model;

import jakarta.persistence.*;

@Entity
public class Befaring {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String navn;
    private String telefon;
    private String epost;

    @Column(length = 1000)
    private String melding;

    private String kontaktmetoder; // f.eks. "Telefon, E-post"
}
