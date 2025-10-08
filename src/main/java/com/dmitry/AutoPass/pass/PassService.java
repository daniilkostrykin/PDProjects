package com.dmitry.AutoPass.pass;

import com.dmitry.AutoPass.pass.dto.CreatePassRequest;
import com.dmitry.AutoPass.pass.dto.PassResponse;
import com.dmitry.AutoPass.user.User;
import com.dmitry.AutoPass.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class PassService {

    private final PassRepository passRepository;
    private final UserRepository userRepository;

    public PassService(PassRepository passRepository, UserRepository userRepository) {
        this.passRepository = passRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public PassResponse create(Long userId, CreatePassRequest req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + userId));

        Pass entity = new Pass();
        entity.setUser(user);
        entity.setType(req.getType());
        entity.setVisitDate(req.getVisitDate());
        entity.setFullName(req.getFullName().trim());
        entity.setReason(req.getReason().trim());

        // если тип PSH — обнулим авто-поля
        if (req.getType() == PassType.PSH) {
            entity.setCarBrand(null);
            entity.setCarModel(null);
            entity.setCarPlate(null);
        } else {
            entity.setCarBrand(emptyToNull(req.getCarBrand()));
            entity.setCarModel(emptyToNull(req.getCarModel()));
            entity.setCarPlate(emptyToNull(req.getCarPlate()));
        }

        entity.setStatus(PassStatus.PENDING);

        Pass saved = passRepository.save(entity);
        return toResponse(saved);
    }

    public Page<PassResponse> listMine(Long userId, Pageable pageable) {
        return passRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable)
                .map(this::toResponse);
    }

    /** Для админа */
    public Page<PassResponse> listAll(Pageable pageable) {
        return passRepository.findAllByOrderByCreatedAtDesc(pageable)
                .map(this::toResponse);
    }

    @Transactional
    public PassResponse setStatus(Long id, PassStatus status) {
        Pass pass = passRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pass not found: " + id));
        pass.setStatus(status);
        return toResponse(pass);
    }

    private String emptyToNull(String s) {
        return (s == null || s.isBlank()) ? null : s.trim();
    }

    private PassResponse toResponse(Pass p) {
        PassResponse dto = new PassResponse();
        dto.setId(p.getId());
        dto.setType(p.getType());
        dto.setVisitDate(p.getVisitDate());
        dto.setFullName(p.getFullName());
        dto.setReason(p.getReason());
        dto.setCarBrand(p.getCarBrand());
        dto.setCarModel(p.getCarModel());
        dto.setCarPlate(p.getCarPlate());
        dto.setStatus(p.getStatus());
        dto.setCreatedAt(p.getCreatedAt());
        dto.setUpdatedAt(p.getUpdatedAt());
        return dto;
    }
}
