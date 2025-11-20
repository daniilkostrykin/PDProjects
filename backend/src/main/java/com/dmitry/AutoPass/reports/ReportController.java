package com.dmitry.AutoPass.reports;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin/reports")
@RequiredArgsConstructor
public class ReportController {

    @GetMapping("/access-logs")
    public ResponseEntity<List<Map<String, Object>>> getAccessLogs(
            @RequestParam(required = false) String dateFrom,
            @RequestParam(required = false) String dateTo,
            @RequestParam(required = false) String checkpoint,
            @RequestParam(required = false) String eventType,
            @RequestParam(required = false) String accessStatus,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String search) {
        // Моковые данные для тестирования
        List<Map<String, Object>> logs = List.of(
                new HashMap<String, Object>() {
                    {
                        put("id", 1);
                        put("timestamp", "2024-12-20T08:30:15Z");
                        put("checkpointName", "Главный вход");
                        put("employeeName", "Иван Петров");
                        put("passCode", "EMP001");
                        put("eventType", "ENTRY");
                        put("accessStatus", "GRANTED");
                        put("denialReason", null);
                        put("department", "IT-отдел");
                    }
                },
                new HashMap<String, Object>() {
                    {
                        put("id", 2);
                        put("timestamp", "2024-12-20T08:45:22Z");
                        put("checkpointName", "Главный вход");
                        put("employeeName", "Мария Цветкова");
                        put("passCode", "EMP002");
                        put("eventType", "ENTRY");
                        put("accessStatus", "GRANTED");
                        put("denialReason", null);
                        put("department", "Бухгалтерия");
                    }
                },
                new HashMap<String, Object>() {
                    {
                        put("id", 3);
                        put("timestamp", "2024-12-20T09:15:33Z");
                        put("checkpointName", "КПП №2 (Склад)");
                        put("employeeName", "Никита Сидоров");
                        put("passCode", "EMP003");
                        put("eventType", "ENTRY");
                        put("accessStatus", "DENIED");
                        put("denialReason", "PASS_BLOCKED");
                        put("department", "Склад");
                    }
                });

        return ResponseEntity.ok(logs);
    }

    @GetMapping("/access-logs/stats")
    public ResponseEntity<Map<String, Object>> getAccessLogsStats(
            @RequestParam(required = false) String dateFrom,
            @RequestParam(required = false) String dateTo) {
        Map<String, Object> stats = new HashMap<String, Object>() {
            {
                put("total", 3);
                put("granted", 2);
                put("denied", 1);
                put("entryCount", 3);
                put("exitCount", 0);
                put("successRate", 67);
            }
        };
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/checkpoints")
    public ResponseEntity<List<String>> getCheckpoints() {
        List<String> checkpoints = List.of(
                "Главный вход",
                "КПП №2 (Склад)",
                "КПП №3 (Производство)",
                "Служебный вход");
        return ResponseEntity.ok(checkpoints);
    }

    @GetMapping("/departments")
    public ResponseEntity<List<String>> getDepartments() {
        List<String> departments = List.of(
                "IT-отдел",
                "Бухгалтерия",
                "Склад",
                "HR",
                "Маркетинг");
        return ResponseEntity.ok(departments);
    }
}
