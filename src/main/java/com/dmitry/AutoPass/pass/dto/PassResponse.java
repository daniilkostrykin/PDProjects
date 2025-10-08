package com.dmitry.AutoPass.pass.dto;

import com.dmitry.AutoPass.pass.PassStatus;
import com.dmitry.AutoPass.pass.PassType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.OffsetDateTime;


@Getter
@Setter
public class PassResponse {
    private Long id;
    private PassType type;
    private LocalDate visitDate;
    private String fullName;
    private String reason;
    private String carBrand;
    private String carModel;
    private String carPlate;
    private PassStatus status;
    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;

    // getters/setters
}
