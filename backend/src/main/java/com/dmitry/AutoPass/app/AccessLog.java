package com.dmitry.AutoPass.app;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.Instant;

@Entity
@Table(name = "access_logs", schema = "app")
@Getter
@Setter
public class AccessLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Instant occurredAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id")
    private Employee employee; // nullable

    @Column(length = 150)
    private String employeeNameSnapshot;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "checkpoint_id")
    private Checkpoint checkpoint; // nullable

    @Column(length = 120)
    private String checkpointNameSnapshot;

    @Column(nullable = false, length = 10)
    private String eventType; // ENTRY/EXIT

    @Column(nullable = false, length = 10)
    private String accessStatus; // GRANTED/DENIED

    @Column(length = 50)
    private String denialReason;

    @Column(length = 64)
    private String passCodeSnapshot;

    @Column(nullable = false)
    private Instant createdAt = Instant.now();
}
