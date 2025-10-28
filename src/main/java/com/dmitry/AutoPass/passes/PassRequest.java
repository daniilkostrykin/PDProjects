package com.dmitry.AutoPass.passes;

import com.dmitry.AutoPass.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "pass_requests", schema = "auth", indexes = {
        @Index(name = "idx_pass_user", columnList = "user_id"),
        @Index(name = "idx_pass_status", columnList = "status"),
        @Index(name = "idx_pass_date", columnList = "visit_date")
})
@Getter
@Setter
public class PassRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 8)
    private PassType type; // CAR|PSH

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private PassStatus status = PassStatus.PENDING;

    @Column(name = "visit_date", nullable = false)
    private LocalDate visitDate;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, length = 500)
    private String reason;

    // только для типа CAR (nullable для PSH)
    private String carBrand;
    private String carModel;
    private String carPlate;

    // Дополнительные поля для админских экранов
    private String invitedBy; // ФИО пригласившего сотрудника (денормализация для отчётов)

    private LocalDateTime validFrom; // период действия пропуска (опционально)
    private LocalDateTime validTo;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
}
