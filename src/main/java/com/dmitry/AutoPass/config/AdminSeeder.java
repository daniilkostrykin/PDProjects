package com.dmitry.AutoPass.config;

import com.dmitry.AutoPass.auth.dto.UserResponse;
import com.dmitry.AutoPass.user.Role;
import com.dmitry.AutoPass.user.User;
import com.dmitry.AutoPass.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class AdminSeeder {
    @Bean
    CommandLineRunner seedAdmin(UserRepository repo) {
        return args -> {
            String adminEmail = System.getenv().getOrDefault("ADMIN_EMAIL", "admin@example.com").toLowerCase();
            String adminPass = System.getenv().getOrDefault("ADMIN_PASSWORD", "AdminP@sswOrd1");
            if (repo.findByEmail(adminEmail).isEmpty()) {
                var enc = new BCryptPasswordEncoder();
                User u = new User();
                u.setEmail(adminEmail);
                u.setFullName("Super Admin");
                u.setPasswordHash(enc.encode(adminPass));
                u.setRole(Role.ADMIN);
                repo.save(u);
                System.out.println(">>> Created admin: " + adminEmail);
            }
        };
    }
}
