package com.dmitry.AutoPass.auth.dto;

public record AuthResponse(String lwtToken, UserResponse user) {}
