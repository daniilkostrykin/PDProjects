package com.dmitry.AutoPass.auth.controller;

import com.dmitry.AutoPass.auth.Service.AuthService;
import com.dmitry.AutoPass.auth.dto.*;
import com.dmitry.AutoPass.jwt.JwtService;
import com.dmitry.AutoPass.auth.Service.RefreshTokenService;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.time.Duration;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterRequest req) {
        return ResponseEntity.ok(authService.register(req));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest req, HttpServletResponse response) {
        var user = authService.authenticate(req);

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = refreshTokenService.createRefreshToken(user.getId()).getToken();

        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(false) // локально false; в проде true + sameSite(None)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofDays(7))
                .build();
        response.addHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok(new AuthResponse(accessToken));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletRequest request, HttpServletResponse response, Principal principal) {
        String refresh = null;
        if (request.getCookies() != null) {
            for (Cookie c : request.getCookies()) {
                if ("refreshToken".equals(c.getName())) {
                    refresh = c.getValue();
                }
            }
        }
        authService.logout(refresh, principal);

        Cookie cookie = new Cookie("refreshToken", "");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        return ResponseEntity.noContent().build();
    }

    // Если позже захочешь эндпоинт /refresh:
    //ВКЛЮЧИТЬ ЗАЩИТУ 
    @PostMapping("/refresh")
    public ResponseEntity<RefreshResponse> refresh(HttpServletRequest request, HttpServletResponse response) {
        // 1) достаём refresh из cookie
     /*    String refresh = null;
        if (request.getCookies() != null) {
            for (Cookie c : request.getCookies()) {
                if ("refreshToken".equals(c.getName())) {
                    refresh = c.getValue();
                    break;
                }
            }
        }
        if (refresh == null || refresh.isBlank()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Refresh token is missing"));
        }

        // 2) валидируем и получаем сущность токена
        var tokenEntity = refreshTokenService.validateAndGet(refresh);
        if (tokenEntity == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid or expired refresh token"));
        }

        // 3) ротация refresh (рекомендуется): старый — revoke, новый — в куку
        var newToken = refreshTokenService.rotate(tokenEntity);

        ResponseCookie cookie = ResponseCookie.from("refreshToken", newToken.getToken())
                .httpOnly(true)
                .secure(false)      // локально false; в продакшне true И sameSite("None")
                .sameSite("Lax")    // если фронт на другом домене и нужны кросс-доменные cookie — ставь "None" + secure(true)
                .path("/")
                .maxAge(java.time.Duration.ofDays(7))
                .build();
        response.addHeader("Set-Cookie", cookie.toString());

        // 4) новый access
        var user = newToken.getUser();
        String access = jwtService.generateAccessToken(user);

        return ResponseEntity.ok(Map.of("accessToken", access));*/
        RefreshResponse mockResponse = new RefreshResponse();

        return ResponseEntity.ok(mockResponse);
    }

}
