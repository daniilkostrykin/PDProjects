package com.dmitry.AutoPass.auth.Service;

import com.dmitry.AutoPass.auth.dto.*;
import com.dmitry.AutoPass.user.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenService refreshTokens;

    public UserResponse register(RegisterRequest req) {
        if (req.getEmail() == null || req.getEmail().isBlank())
            throw new IllegalArgumentException("email is required");
        if (req.getPassword() == null || req.getPassword().isBlank())
            throw new IllegalArgumentException("password is required");

        if (users.existsByUsername(req.getEmail()))
            throw new EmailAlreadyRegisteredException("Email already registered");

        var u = new User();
        u.setEmail(req.getEmail()); // устанавливаем email
        u.setUsername(req.getEmail()); // важный момент — username = email
        u.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        u.setEnabled(true);
        u.setRoles(Set.of(Role.USER.name()));
        // при желании добавь u.setFullName(req.getFullName());
        u = users.save(u);

        return new UserResponse(u.getId(), u.getUsername(), u.getRoles());
    }

    /** Возвращаем доменную сущность для генерации JWT */
    public User authenticate(LoginRequest req) {
        var user = users.findByUsername(req.getEmail()) // ищем по email
                .orElseThrow(() -> new BadCredentialsException("User not found"));
        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash()))
            throw new BadCredentialsException("Invalid credentials");
        return user;
    }

    public void logout(String refreshToken, java.security.Principal principal) {
        // инвалидируем конкретный refresh (если был)
        refreshTokens.revoke(refreshToken);
        // при желании: refreshTokens.revokeAllForUser(currentUserId)
    }
}
