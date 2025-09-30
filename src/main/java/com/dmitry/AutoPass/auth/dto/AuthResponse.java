package com.dmitry.AutoPass.auth.dto;

import java.util.List;
import java.util.UUID;

public record AuthResponse (String lwtToken, UserDto user) {
    public record UserDto(UUID id, String username, List<String> roles){
        
    }
}
