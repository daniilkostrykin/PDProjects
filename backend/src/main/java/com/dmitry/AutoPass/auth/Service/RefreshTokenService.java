package com.dmitry.AutoPass.auth.Service;

import com.dmitry.AutoPass.auth.model.RefreshToken;
import com.dmitry.AutoPass.auth.repository.RefreshTokenRepository;
import com.dmitry.AutoPass.user.User;
import com.dmitry.AutoPass.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository repo;
    private final UserRepository users;

    @Value("${refresh.exp-days:7}")
    private long expDays;

    /** Создать новый refresh-токен для пользователя */
    @Transactional
    public RefreshToken createRefreshToken(Long userId) {
        User user = users.findById(userId).orElseThrow();
        RefreshToken t = new RefreshToken();
        t.setUser(user);
        t.setToken(UUID.randomUUID().toString());
        t.setRevoked(false);
        t.setExpiresAt(Instant.now().plus(expDays, ChronoUnit.DAYS));
        return repo.save(t);
    }

    /** Найти сущность по строке токена */
    public Optional<RefreshToken> findByToken(String token) {
        if (token == null || token.isBlank()) return Optional.empty();
        return repo.findByToken(token);
    }

    /** Токен ещё действителен и не отозван */
    public boolean isValid(RefreshToken t) {
        return t != null && !t.isRevoked() && t.getExpiresAt().isAfter(Instant.now());
    }

    /** Отозвать конкретный refresh */
    @Transactional
    public void revoke(String tokenValue) {
        if (tokenValue == null) return;
        repo.findByToken(tokenValue).ifPresent(t -> {
            t.setRevoked(true);
            repo.save(t);
        });
    }

    /** Отозвать все активные refresh определённого пользователя */
    @Transactional
    public void revokeAllForUser(Long userId) {
        repo.revokeAllForUser(userId);
    }

    /** Ротация refresh: отозвать старый и выдать новый для того же пользователя */
    @Transactional
    public RefreshToken rotate(RefreshToken oldToken) {
        if (oldToken == null) throw new IllegalArgumentException("Old refresh token is null");
        oldToken.setRevoked(true);
        repo.save(oldToken);
        return createRefreshToken(oldToken.getUser().getId());
    }

    /** Утилита: валидировать строку токена и вернуть сущность или null */
    public RefreshToken validateAndGet(String tokenValue) {
        var rt = findByToken(tokenValue).orElse(null);
        if (!isValid(rt)) return null;
        return rt;
    }
}
