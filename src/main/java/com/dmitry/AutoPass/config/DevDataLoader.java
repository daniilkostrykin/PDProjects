package com.dmitry.AutoPass.config;

import com.dmitry.AutoPass.user.User;
import com.dmitry.AutoPass.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@RequiredArgsConstructor
@Profile({ "dev", "default", "local" })
public class DevDataLoader implements CommandLineRunner {

    private final UserRepository users;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Гарантируем наличие администратора (если уже есть — пропускаем)
        seedAdminIfAbsent("admin@local", "admin", "admin123");

        // Добавляем 5 тестовых пользователей
        seedUserIfAbsent("user1@local", "user1", "user123");
        seedUserIfAbsent("user2@local", "user2", "user123");
        seedUserIfAbsent("user3@local", "user3", "user123");
        seedUserIfAbsent("user4@local", "user4", "user123");
        seedUserIfAbsent("user5@local", "user5", "user123");
    }

    private void seedAdminIfAbsent(String email, String username, String rawPassword) {
        if (users.findByEmail(email).isPresent())
            return;
        User admin = new User();
        admin.setEmail(email);
        admin.setUsername(username);
        admin.setPasswordHash(passwordEncoder.encode(rawPassword));
        admin.setEnabled(true);
        admin.setRoles(Set.of("ADMIN", "USER"));
        users.save(admin);
    }

    private void seedUserIfAbsent(String email, String username, String rawPassword) {
        if (users.findByEmail(email).isPresent())
            return;
        User u = new User();
        u.setEmail(email);
        u.setUsername(username);
        u.setPasswordHash(passwordEncoder.encode(rawPassword));
        u.setEnabled(true);
        u.setRoles(Set.of("USER"));
        users.save(u);
    }
}
