package com.dmitry.AutoPass.passes;

import com.dmitry.AutoPass.passes.dto.PassCreateRequest;
import com.dmitry.AutoPass.passes.dto.PassResponse;

public class PassMapper {

    public static PassRequest toEntity(PassCreateRequest r) {
        var e = new PassRequest();
        e.setType(r.type());
        e.setVisitDate(r.visitDate());
        e.setFullName(r.fullName());
        e.setReason(r.reason());
        e.setCarBrand(r.carBrand());
        e.setCarModel(r.carModel());
        e.setCarPlate(r.carPlate());
        return e;
    }

    public static PassResponse toDto(PassRequest e) {
        return new PassResponse(
                e.getId(),
                e.getType(),
                e.getVisitDate(),
                e.getFullName(),
                e.getReason(),
                e.getCarBrand(),
                e.getCarModel(),
                e.getCarPlate(),
                e.getStatus(),
                e.getCreatedAt()
        );
    }
}
