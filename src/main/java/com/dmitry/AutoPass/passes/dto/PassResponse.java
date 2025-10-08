package com.dmitry.AutoPass.passes.dto;

import com.dmitry.AutoPass.passes.PassStatus;
import com.dmitry.AutoPass.passes.PassType;
import java.time.Instant;
import java.time.LocalDate;

public record PassResponse(
        Long id,
        PassType type,
        LocalDate visitDate,
        String fullName,
        String reason,
        String carBrand,
        String carModel,
        String carPlate,
        PassStatus status,
        Instant createdAt
) {}
