/*
package com.dmitry.AutoPass.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Service
public class JwtService {
    private final Key key;

    public JwtService() {
        String secret = System.getenv().getOrDefault("JWT_SECRET",
                "change-me-super-secret-change-me-32-bytes-min!");
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
    public String issue(String subject, Map<String, Object> claims, long ttlSecond){
        Instant now = Instant.now();
        return Jwts.builder().subject(subject)
                .claims(claims)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(ttlSecond)))
                .signWith(key)
                .compact();

    }}
*/
