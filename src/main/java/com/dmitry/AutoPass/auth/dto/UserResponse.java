package com.dmitry.AutoPass.auth.dto;

import java.time.Instant;
import java.util.UUID;

public record UserResponse(UUID id, String email, String fullName, Instant createdAt) {}

