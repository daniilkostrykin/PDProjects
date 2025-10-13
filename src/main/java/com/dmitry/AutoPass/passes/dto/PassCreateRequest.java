package com.dmitry.AutoPass.passes.dto;

import com.dmitry.AutoPass.passes.PassType;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record PassCreateRequest(
                @NotNull PassType type, // CAR | PSH
                @NotNull LocalDate visitDate, // YYYY-MM-DD
                @NotBlank String fullName,
                @NotBlank String reason,
                String carBrand,
                String carModel,
                String carPlate,
                String invitedBy,
                LocalDateTime validFrom,
                LocalDateTime validTo) {
}
