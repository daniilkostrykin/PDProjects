package com.dmitry.AutoPass.passes;

import com.dmitry.AutoPass.passes.dto.PassCreateRequest;
import com.dmitry.AutoPass.passes.dto.PassResponse;
import com.dmitry.AutoPass.user.User;
import com.dmitry.AutoPass.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class PassService {

    private final PassRepository repo;
    private final UserRepository users;

    private User findUserByPrincipalName(String name) {
        // В JWT subject обычно email => попробуем по email, затем по username
        return users.findByEmail(name)
                .or(() -> users.findByUsername(name))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found: " + name));
    }

    @Transactional
    public PassResponse create(PassCreateRequest req, String principalName) {
        User u = findUserByPrincipalName(principalName);
        var e = PassMapper.toEntity(req);
        e.setUser(u);
        e.setStatus(PassStatus.PENDING);
        return PassMapper.toDto(repo.save(e));
    }

    public Page<PassResponse> myList(String principalName, String status, Pageable pageable) {
        User u = findUserByPrincipalName(principalName);
        if (status == null || status.isBlank()) {
            return repo.findByUserOrderByCreatedAtDesc(u, pageable).map(PassMapper::toDto);
        }
        PassStatus st = PassStatus.valueOf(status.toUpperCase());
        return repo.findByUserAndStatusOrderByCreatedAtDesc(u, st, pageable).map(PassMapper::toDto);
    }

    // --- admin ---

    public Page<PassResponse> adminQueue(String status, Pageable pageable) {
        PassStatus st = PassStatus.valueOf((status == null ? "PENDING" : status).toUpperCase());
        return repo.findByStatusOrderByCreatedAtAsc(st, pageable).map(PassMapper::toDto);
    }

    @Transactional
    public PassResponse approve(Long id) {
        var e = repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pass not found"));
        e.setStatus(PassStatus.APPROVED);
        return PassMapper.toDto(repo.save(e));
    }

    @Transactional
    public PassResponse reject(Long id) {
        var e = repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Pass not found"));
        e.setStatus(PassStatus.REJECTED);
        return PassMapper.toDto(repo.save(e));
    }

    public record Stats(long approved, long pending, long rejected) {}

    public Stats stats() {
        long a = repo.countByStatus(PassStatus.APPROVED);
        long p = repo.countByStatus(PassStatus.PENDING);
        long r = repo.countByStatus(PassStatus.REJECTED);
        return new Stats(a, p, r);
    }
}
