package com.dmitry.AutoPass.jwt;

import io.jsonwebtoken.Claims;
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

    public JwtService(com.dmitry.AutoPass.config.AppProperties props) {
        this.key = Keys.hmacShaKeyFor(props.secutiry().jwtSecret.getBytes(StandardCharsets.UTF_8));
    }

    public String issue(String subject, Map<String, Object> claims, long ttlSeconds) {
        Instant now = Instant.now();
        return Jwts.builder().subject(subject)
                .claims(claims)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(ttlSeconds)))
                .signWith(key)
                .compact();
    }

    public Claims parse(String token) {
        return Jwts.parser().verifyWith((javax.crypto.SecretKey) key).build().parseEncryptedClaims(token).getPayload();
    }
}
