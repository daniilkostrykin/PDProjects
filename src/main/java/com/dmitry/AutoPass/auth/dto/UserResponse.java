package com.dmitry.AutoPass.auth.dto;

import com.dmitry.AutoPass.user.User;


public record UserResponse(Long id, String email, String fullName, String role) {
    public UserResponse(User u) {
        this(u.getId(), u.getEmail(), u.getFullName(), u.getRole().name());
    }
}


