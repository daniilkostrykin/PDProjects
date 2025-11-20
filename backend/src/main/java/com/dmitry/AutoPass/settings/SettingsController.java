package com.dmitry.AutoPass.settings;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/settings")
@RequiredArgsConstructor
public class SettingsController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> getSettings() {
        // Моковые данные для настроек системы
        Map<String, Object> settings = new HashMap<String, Object>() {
            {
                put("systemName", "AutoPass System");
                put("version", "1.0.0");
                put("maxPassesPerDay", 50);
                put("passValidityDays", 30);
                put("autoApprovalEnabled", false);
                put("emailNotifications", true);
                put("smsNotifications", false);
                put("workingHours", Map.of(
                        "start", "08:00",
                        "end", "18:00"));
                put("security", Map.of(
                        "sessionTimeout", 30,
                        "maxLoginAttempts", 5,
                        "passwordMinLength", 8));
            }
        };
        return ResponseEntity.ok(settings);
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateSettings(@RequestBody Map<String, Object> newSettings) {
        // Моковое обновление настроек
        Map<String, Object> result = new HashMap<String, Object>() {
            {
                put("message", "Настройки успешно обновлены");
                put("updatedAt", "2024-01-10T10:30:00Z");
                put("settings", newSettings);
            }
        };
        return ResponseEntity.ok(result);
    }

    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getUsers() {
        // Моковые данные пользователей для управления
        List<Map<String, Object>> users = List.of(
                new HashMap<String, Object>() {
                    {
                        put("id", 1);
                        put("username", "admin");
                        put("email", "admin@local");
                        put("role", "ADMIN");
                        put("status", "ACTIVE");
                        put("lastLogin", "2024-01-10T09:15:00Z");
                        put("createdAt", "2024-01-01T00:00:00Z");
                    }
                },
                new HashMap<String, Object>() {
                    {
                        put("id", 2);
                        put("username", "user1");
                        put("email", "user1@company.com");
                        put("role", "USER");
                        put("status", "ACTIVE");
                        put("lastLogin", "2024-01-09T16:30:00Z");
                        put("createdAt", "2024-01-05T10:00:00Z");
                    }
                },
                new HashMap<String, Object>() {
                    {
                        put("id", 3);
                        put("username", "user2");
                        put("email", "user2@company.com");
                        put("role", "USER");
                        put("status", "BLOCKED");
                        put("lastLogin", "2024-01-08T14:20:00Z");
                        put("createdAt", "2024-01-03T15:30:00Z");
                    }
                });
        return ResponseEntity.ok(users);
    }

    @PostMapping("/users")
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody Map<String, Object> userData) {
        // Моковое создание пользователя
        Map<String, Object> result = new HashMap<String, Object>() {
            {
                put("id", 4);
                put("message", "Пользователь создан успешно");
                put("user", userData);
            }
        };
        return ResponseEntity.ok(result);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<Map<String, Object>> updateUser(@PathVariable Long id,
            @RequestBody Map<String, Object> userData) {
        // Моковое обновление пользователя
        Map<String, Object> result = new HashMap<String, Object>() {
            {
                put("id", id);
                put("message", "Пользователь обновлен успешно");
                put("user", userData);
            }
        };
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable Long id) {
        // Моковое удаление пользователя
        Map<String, Object> result = new HashMap<String, Object>() {
            {
                put("id", id);
                put("message", "Пользователь удален успешно");
            }
        };
        return ResponseEntity.ok(result);
    }

    @PostMapping("/users/{id}/block")
    public ResponseEntity<Map<String, Object>> blockUser(@PathVariable Long id) {
        // Моковая блокировка пользователя
        Map<String, Object> result = new HashMap<String, Object>() {
            {
                put("id", id);
                put("message", "Пользователь заблокирован");
                put("status", "BLOCKED");
            }
        };
        return ResponseEntity.ok(result);
    }

    @PostMapping("/users/{id}/unblock")
    public ResponseEntity<Map<String, Object>> unblockUser(@PathVariable Long id) {
        // Моковая разблокировка пользователя
        Map<String, Object> result = new HashMap<String, Object>() {
            {
                put("id", id);
                put("message", "Пользователь разблокирован");
                put("status", "ACTIVE");
            }
        };
        return ResponseEntity.ok(result);
    }
}
