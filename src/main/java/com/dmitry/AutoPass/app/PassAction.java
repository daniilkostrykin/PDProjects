package com.dmitry.AutoPass.app;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.Instant;

@Entity
@Table(name = "pass_actions", schema = "app")
@Getter
@Setter
public class PassAction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long passRequestId; // references auth.pass_requests(id)

    @Column(nullable = false, length = 10)
    private String action; // APPROVE/REJECT

    private Long actorUserId; // references auth.users(id)

    @Column
    private String reason; // optional for REJECT

    @Column(nullable = false)
    private Instant createdAt = Instant.now();
}
