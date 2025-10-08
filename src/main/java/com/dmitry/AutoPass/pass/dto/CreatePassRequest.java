package com.dmitry.AutoPass.pass.dto;

import com.dmitry.AutoPass.pass.PassType;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreatePassRequest {

    @NotNull
    private PassType type;

    @NotNull
    private LocalDate visitDate;

    @NotBlank
    @Size(max = 150)
    private String fullName;

    @NotBlank
    @Size(max = 500)
    private String reason;

    // для PSH могут быть null
    @Size(max = 100)
    private String carBrand;

    @Size(max = 100)
    private String carModel;

    @Size(max = 32)
    private String carPlate;

    // getters/setters
}
