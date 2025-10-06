package com.dmitry.AutoPass.auth.service;

import com.dmitry.AutoPass.auth.dto.*;
import com.dmitry.AutoPass.jwt.JwtService;
import com.dmitry.AutoPass.user.User;
import com.dmitry.AutoPass.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserService userService;
    private final JwtService jwtService;

    @Transactional
    public UserResponse register(RegisterRequest req) {
        User saved = userService.register(req);
        return new UserResponse(saved);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest req) {
        User user = userService.findByEmail(req.username())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!userService.matches(req.password(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }
        String token = jwtService.generate(user);
        return new AuthResponse(token, new UserResponse(user));
    }
}
