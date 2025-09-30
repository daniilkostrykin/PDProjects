package com.dmitry.AutoPass.auth;

import com.dmitry.AutoPass.auth.dto.AuthResponse;
import com.dmitry.AutoPass.auth.dto.LoginRequest;
import com.dmitry.AutoPass.auth.dto.RegisterRequest;
import com.dmitry.AutoPass.auth.dto.UserResponse;
import com.dmitry.AutoPass.jwt.JwtService;
import com.dmitry.AutoPass.user.User;
import com.dmitry.AutoPass.user.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

/*@CrossOrigin(origins = {"http://localhost:5173","http://localhost:3000"}, allowCredentials = "true")*/
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final UserService userService;
    private final JwtService jwtService;

    public AuthController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@Valid @RequestBody RegisterRequest req){
        User u = userService.register(req);
        return new UserResponse(u.getId(), u.getEmail(),u.getFullName(), u.getCreatedAt());
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req){
        var userOpt = userService.findByEmail(req.username().trim().toLowerCase());
        if (userOpt.isEmpty()){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Bad credentials");
        }
        var u = userOpt.get();
        if(!userService.matches(req.password(), u.getPasswordHash())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Bad credentials");
        }
        var roles = java.util.List.of("ROLE_" + u.getRole().name());
        var token = jwtService.issue(
                u.getId().toString(),
                java.util.Map.of("roles", roles, "email", u.getEmail()),
                3600
        );
        var userDto = new AuthResponse.UserDto(u.getId(), u.getEmail(), roles);
        var response = new AuthResponse(token, userDto);
        return ResponseEntity.ok(response);
    }
}
