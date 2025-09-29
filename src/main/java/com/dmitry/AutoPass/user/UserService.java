package com.dmitry.AutoPass.user;

import com.dmitry.AutoPass.auth.dto.RegisterRequest;
import jakarta.transaction.Transactional;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserService(UserRepository repo) {
        this.repo = repo;
    }
    @Transactional
    public User register(RegisterRequest req){
        String email = req.email().toLowerCase().trim();
        if (repo.existsAllByEmail(email)){
            throw new DataIntegrityViolationException("Email already registered");
        }
        User u = new User();
        u.setEmail(email);
        u.setFullName(req.fullName().trim());
        u.setPasswordHash(encoder.encode(req.password()));
        return repo.save(u);
    }

    public Optional<User> findByEmail(String email){
        return repo.findByEmail(email.toLowerCase().trim());
    }
    public boolean matches(String raw, String hash){
        return encoder.matches(raw, hash);
    }
}
