package com.dmitry.AutoPass.config;

import com.dmitry.AutoPass.user.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository users;
    private final PasswordEncoder encoder;

    @Override
    public void run(String... args) {
        if (users.findByUsername("admin@local").isEmpty()) {
            var u = new User();
            u.setUsername("admin@local");
            u.setPasswordHash(encoder.encode("admin"));
            u.setEnabled(true);
            u.setRoles(Set.of(Role.ADMIN.name(), Role.USER.name()));
            users.save(u);
        }
    }
}
