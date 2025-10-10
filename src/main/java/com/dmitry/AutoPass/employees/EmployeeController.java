package com.dmitry.AutoPass.employees;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/employees")
@RequiredArgsConstructor
public class EmployeeController {

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> listAll(
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search) {
        // Моковые данные для тестирования
        List<Map<String, Object>> employees = List.of(
                new HashMap<String, Object>() {
                    {
                        put("id", 1);
                        put("firstName", "Иван");
                        put("lastName", "Петров");
                        put("middleName", "Сергеевич");
                        put("department", "IT-отдел");
                        put("position", "Разработчик");
                        put("email", "ivan.petrov@company.com");
                        put("phone", "+7 (999) 123-45-67");
                        put("status", "ACTIVE");
                        put("passCode", "EMP001");
                        put("passStatus", "ACTIVE");
                        put("passExpiryDate", "2025-12-31");
                    }
                },
                new HashMap<String, Object>() {
                    {
                        put("id", 2);
                        put("firstName", "Мария");
                        put("lastName", "Цветкова");
                        put("middleName", "Александровна");
                        put("department", "Бухгалтерия");
                        put("position", "Главный бухгалтер");
                        put("email", "maria.tsvetkova@company.com");
                        put("phone", "+7 (999) 234-56-78");
                        put("status", "ACTIVE");
                        put("passCode", "EMP002");
                        put("passStatus", "ACTIVE");
                        put("passExpiryDate", "2025-12-31");
                    }
                });

        return ResponseEntity.ok(employees);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<String, Object>() {
            {
                put("total", 2);
                put("active", 2);
                put("onLeave", 0);
                put("fired", 0);
                put("activePasses", 2);
                put("blockedPasses", 0);
            }
        };
        return ResponseEntity.ok(stats);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody Map<String, Object> employee) {
        // Моковое создание сотрудника
        Map<String, Object> newEmployee = new HashMap<String, Object>() {
            {
                put("id", 3);
                put("message", "Сотрудник создан успешно");
            }
        };
        return ResponseEntity.ok(newEmployee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id,
            @RequestBody Map<String, Object> employee) {
        // Моковое обновление сотрудника
        Map<String, Object> updatedEmployee = new HashMap<String, Object>() {
            {
                put("id", id);
                put("message", "Сотрудник обновлен успешно");
            }
        };
        return ResponseEntity.ok(updatedEmployee);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        // Моковое удаление сотрудника
        Map<String, Object> result = new HashMap<String, Object>() {
            {
                put("id", id);
                put("message", "Сотрудник удален успешно");
            }
        };
        return ResponseEntity.ok(result);
    }
}
