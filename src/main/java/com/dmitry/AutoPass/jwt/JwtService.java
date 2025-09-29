package com.dmitry.AutoPass.jwt;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.Map;


@Service
public class JwtService {
    private final SecretKey key;

    public JwtService() {
        String secret = System.getenv().getOrDefault(
                "JWT_SECRET", "change-me-super-secret-change-me-32-bytes-minimum-string-123456");
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // выпуск токена
    public String issue(String subject, java.util.Map<String,Object> claims, long ttlSeconds) {
        var now = java.time.Instant.now();
        return Jwts.builder()
                .subject(subject)
                .claims(claims)
                .issuedAt(java.util.Date.from(now))
                .expiration(java.util.Date.from(now.plusSeconds(ttlSeconds)))
                .signWith(key)
                .compact();
    }

    // разбор токена
    public Claims parse(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
