package com.dmitry.AutoPass.pass;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import com.dmitry.AutoPass.user.User;
import lombok.*;

@Entity
@Table(name = "passes")
@Getter @Setter
public class Pass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private PassType type;

    @Column(name = "visit_date", nullable = false)
    private LocalDate visitDate;

    @Column(nullable = false, length = 150)
    private String fullName;

    @Column(nullable = false, length = 500)
    private String reason;

    @Column(length = 100)
    private String carBrand;

    @Column(length = 100)
    private String carModel;

    @Column(length = 32)
    private String carPlate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private PassStatus status = PassStatus.PENDING;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false,
            foreignKey = @ForeignKey(name = "fk_passes_users"))
    private User user;

    @Column(nullable = false, updatable = false)
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @Column(nullable = false)
    private OffsetDateTime updatedAt = OffsetDateTime.now();

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = OffsetDateTime.now();
    }
}