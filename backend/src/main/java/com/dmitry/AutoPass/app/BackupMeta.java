package com.dmitry.AutoPass.app;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.Instant;

@Entity
@Table(name = "backups", schema = "app")
@Getter
@Setter
public class BackupMeta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String filename;

    @Column
    private Long sizeBytes;

    @Column(nullable = false, length = 10)
    private String type; // AUTO/MANUAL

    @Column(nullable = false)
    private Instant createdAt = Instant.now();
}
