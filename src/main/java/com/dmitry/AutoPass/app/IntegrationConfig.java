package com.dmitry.AutoPass.app;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.Instant;

@Entity
@Table(name = "integrations", schema = "app")
@Getter
@Setter
public class IntegrationConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 20)
    private String type; // CHECKPOINT/LPR/EMAIL/SMS/WEBHOOK

    @Column
    private String endpoint;

    @Column(length = 120)
    private String username;

    @Column
    private String secret;

    @Column(length = 20)
    private String status = "DISCONNECTED";

    @Column
    private Instant lastSyncAt;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();

    @Column(nullable = false)
    private Instant updatedAt = Instant.now();
}
