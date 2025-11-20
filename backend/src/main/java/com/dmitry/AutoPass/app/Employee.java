package com.dmitry.AutoPass.app;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.Instant;

@Entity
@Table(name = "employees", schema = "app")
@Getter
@Setter
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String fullName;

    @Column(length = 150)
    private String email;

    @Column(length = 50)
    private String phone;

    @Column(length = 120)
    private String position;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    @Column(nullable = false, length = 20)
    private String employeeStatus = "ACTIVE"; // ACTIVE/ON_LEAVE/FIRED/BLOCKED/EXPIRED

    @Column(nullable = false, length = 20)
    private String passStatus = "ACTIVE"; // ACTIVE/BLOCKED/EXPIRED

    @Column(length = 64)
    private String passCode;

    @Column
    private Instant passExpiresAt;

    @Column(nullable = false)
    private Instant updatedAt = Instant.now();

    @Column(nullable = false)
    private Instant createdAt = Instant.now();
}
